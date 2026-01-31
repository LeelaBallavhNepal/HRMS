import { AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

   @ViewChild('sidenavScrollbar', { static: false }) sidenavScrollbar?: ElementRef<HTMLElement>;
  @ViewChild('navScroller', { static: false }) navScroller?: ElementRef<HTMLElement>;
  @ViewChild('btnScrollLeft', { static: false }) btnScrollLeft?: ElementRef<HTMLButtonElement>;
  @ViewChild('btnScrollRight', { static: false }) btnScrollRight?: ElementRef<HTMLButtonElement>;

  private unsubs: Array<() => void> = [];

  constructor(private r2: Renderer2) {}

  ngAfterViewInit(): void {
    this.initSmoothScrollbar();
    this.bindQualification();
    this.bindFamily();
    this.bindAddresses();
    this.bindCareer();
    this.bindLanguages();
    this.bindPassions();
    this.bindSkills();
    this.bindMemberships();
    this.bindSave();
    this.bindTabScroller();
  }

  ngOnDestroy(): void {
    this.unsubs.forEach(u => u());
    this.unsubs = [];
  }

  // ------------ helpers ------------
  private $ = <T extends Element = Element>(sel: string, root: Document | Element = document) =>
    root.querySelector<T>(sel);
  private $$ = (sel: string, root: Document | Element = document) =>
    Array.from(root.querySelectorAll(sel));

  private listen(target: any, event: string, handler: any) {
    const un = this.r2.listen(target, event, handler);
    this.unsubs.push(un);
  }

  // ------------ smooth scrollbar ------------
  private initSmoothScrollbar() {
    const win: any = window as any;
    const el = this.sidenavScrollbar?.nativeElement || this.$<HTMLElement>('#sidenav-scrollbar');
    const isWin = navigator.platform.indexOf('Win') > -1;
    if (isWin && el && win.Scrollbar?.init) {
      win.Scrollbar.init(el, { damping: 0.5 });
    }
  }

  // ------------ Qualification ------------
  private bindQualification() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddQual');
    const tbody = this.$<HTMLTableSectionElement>('#tblQual tbody');
    if (!addBtn || !tbody) return;

    this.listen(addBtn, 'click', () => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input class="form-control needs-approval" placeholder="Degree/Course"></td>
        <td><input class="form-control needs-approval" placeholder="Institute"></td>
        <td style="width:120px;"><input class="form-control needs-approval" placeholder="Year"></td>
        <td style="width:150px;">
          <div class="form-check">
            <input class="form-check-input needs-approval" type="checkbox">
            <label class="form-check-label">Mark as most recent</label>
          </div>
        </td>
        <td class="text-end" style="width:60px;">
          <button class="btn btn-link text-danger p-0 btnDelRow" title="Remove"><i class="ni ni-fat-remove"></i></button>
        </td>`;
      tbody.prepend(tr);
    });

    // delegate deletes
    this.listen(document, 'click', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('.btnDelRow')) {
        e.preventDefault();
        t.closest('tr')?.remove();
      }
    });
  }

  // ------------ Family ------------
  private bindFamily() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddFamily');
    const tbody = this.$<HTMLTableSectionElement>('#tblFamily tbody');
    if (!addBtn || !tbody) return;

    this.listen(addBtn, 'click', () => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input class="form-control needs-approval" placeholder="Full Name"></td>
        <td>
          <select class="form-control needs-approval rel">
            <option>Father</option><option>Mother</option>
            <option>Spouse</option><option>Son</option><option>Daughter</option>
            <option>Brother</option><option>Sister</option>
            <option>Father-in-law</option><option>Mother-in-law</option>
          </select>
        </td>
        <td><input type="date" class="form-control needs-approval"></td>
        <td><select class="form-control needs-approval"><option>Male</option><option>Female</option><option>Other</option></select></td>
        <td class="text-center"><input type="checkbox" class="form-check-input needs-approval mediclaim" checked></td>
        <td class="text-end"><button class="btn btn-link text-danger p-0 btnDelRow" title="Remove"><i class="ni ni-fat-remove"></i></button></td>`;
      tbody.appendChild(tr);
    });

    this.listen(document, 'change', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.classList.contains('rel')) {
        const row = t.closest('tr')!;
        const claim = row.querySelector<HTMLInputElement>('.mediclaim');
        const val = (t as HTMLSelectElement).value;
        if (claim) claim.checked = !(val === 'Brother' || val === 'Sister');
      }
    });
  }

  // ------------ Addresses ------------
  private bindAddresses() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddAddress');
    const container = this.$<HTMLElement>('#addresses');
    if (!addBtn || !container) return;

    this.listen(addBtn, 'click', () => {
      const tmpl = container.querySelector('[data-addr]') as HTMLElement;
      if (!tmpl) return;
      const clone = tmpl.cloneNode(true) as HTMLElement;

      (clone.querySelector('.addr-type') as HTMLSelectElement).value = 'Other';
      clone.querySelectorAll('input').forEach(i => {
        if ((i as HTMLInputElement).type === 'checkbox') (i as HTMLInputElement).checked = false;
        else (i as HTMLInputElement).value = '';
      });

      container.appendChild(clone);
    });

    this.listen(document, 'click', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('.btnDelAddress')) {
        const all = this.$$('#addresses [data-addr]');
        if (all.length > 1) t.closest('[data-addr]')?.remove();
      }
    });
  }

  // ------------ Career ------------
  private bindCareer() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddCareer');
    const tl = this.$<HTMLElement>('#careerTimeline');
    if (!addBtn || !tl) return;

    this.listen(addBtn, 'click', () => {
      const wrap = document.createElement('div');
      wrap.className = 't-item';
      wrap.setAttribute('data-career', '');
      wrap.innerHTML = `
        <span class="t-dot"></span>
        <div><input class="form-control mb-1" placeholder="Role • Company • Dates (e.g., Jan 2022 – Dec 2024)"></div>
        <div><input class="form-control mb-1" placeholder="Highlights / Achievements"></div>
        <button class="btn btn-link text-danger p-0 btnDelCareer">Remove</button>`;
      tl.prepend(wrap);
    });

    this.listen(document, 'click', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.classList.contains('btnDelCareer')) {
        t.closest('[data-career]')?.remove();
      }
    });
  }

  // ------------ Languages ------------
  private bindLanguages() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddLanguage');
    const list = this.$<HTMLElement>('#langList');
    if (!addBtn || !list) return;

    this.listen(addBtn, 'click', () => {
      const row = document.createElement('div');
      row.className = 'row g-2 align-items-center mb-2';
      row.setAttribute('data-lang', '');
      row.innerHTML = `
        <div class="col-md-4"><input class="form-control" placeholder="Language"></div>
        <div class="col-md-4"><select class="form-control"><option>Fluent</option><option>Professional</option><option>Conversational</option><option>Basic</option></select></div>
        <div class="col-md-3"><input class="form-control" placeholder="Cert/Notes"></div>
        <div class="col-md-1 text-end"><button class="btn btn-link text-danger p-0 btnDelLang"><i class="ni ni-fat-remove"></i></button></div>`;
      list.appendChild(row);
    });

    this.listen(document, 'click', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.classList.contains('btnDelLang')) {
        t.closest('[data-lang]')?.remove();
      }
    });
  }

  // ------------ Passions (chips) ------------
  private addChip(wrap: HTMLElement, text: string) {
    if (!text) return;
    const span = document.createElement('span');
    span.className = 'chip';
    span.innerHTML = `${text}<span class="x">&times;</span>`;
    wrap.appendChild(span);
  }

  private bindPassions() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddPassion');
    const input = this.$<HTMLInputElement>('#passionInput');
    const chips = this.$<HTMLElement>('#passionChips');
    if (!addBtn || !input || !chips) return;

    this.listen(addBtn, 'click', () => {
      this.addChip(chips, input.value.trim());
      input.value = '';
    });

    this.listen(chips, 'click', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.classList.contains('x')) t.parentElement?.remove();
    });
  }

  // ------------ Skills (chips + level) ------------
  private bindSkills() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddSkill');
    const txt = this.$<HTMLInputElement>('#skillInput');
    const lvl = this.$<HTMLSelectElement>('#skillLevel');
    const chips = this.$<HTMLElement>('#skillChips');
    if (!addBtn || !txt || !lvl || !chips) return;

    this.listen(addBtn, 'click', () => {
      const t = txt.value.trim();
      if (!t) return;
      this.addChip(chips, `${t} (${lvl.value})`);
      txt.value = '';
    });

    this.listen(chips, 'click', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.classList.contains('x')) t.parentElement?.remove();
    });
  }

  // ------------ Memberships ------------
  private bindMemberships() {
    const addBtn = this.$<HTMLButtonElement>('#btnAddMembership');
    const list = this.$<HTMLElement>('#memberList');
    if (!addBtn || !list) return;

    this.listen(addBtn, 'click', () => {
      const row = document.createElement('div');
      row.className = 'row g-2 align-items-center mb-2';
      row.setAttribute('data-member', '');
      row.innerHTML = `
        <div class="col-md-5"><input class="form-control" placeholder="Organization/Association"></div>
        <div class="col-md-4"><input class="form-control" placeholder="Member ID / Notes"></div>
        <div class="col-md-2"><input class="form-control" placeholder="Since (YYYY)"></div>
        <div class="col-md-1 text-end"><button class="btn btn-link text-danger p-0 btnDelMember"><i class="ni ni-fat-remove"></i></button></div>`;
      list.appendChild(row);
    });

    this.listen(document, 'click', (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.classList.contains('btnDelMember')) {
        t.closest('[data-member]')?.remove();
      }
    });
  }

  // ------------ Save (stub) ------------
  private bindSave() {
    const btn = this.$<HTMLButtonElement>('#btnSave');
    if (!btn) return;

    this.listen(btn, 'click', async () => {
      const getVal = (sel: string) => this.$<HTMLInputElement>(sel)?.value.trim() || '';
      const direct = {
        mobile: getVal('#empMobile'),
        officeTel: getVal('#empOfficeTel'),
        pan: getVal('#empPAN')
      };

      // const approvals = {
      //   addresses: this.$$('#addresses [data-addr]').map(c => ({
      //     type: (c.querySelector('.addr-type') as HTMLSelectElement).value,
      //     emergency: (c.querySelector('.emergency-flag') as HTMLInputElement)?.checked || false,
      //     street: (c.querySelector('.addr-street') as HTMLInputElement)?.value.trim() || '',
      //     city: (c.querySelector('.addr-city') as HTMLInputElement)?.value.trim() || '',
      //     state: (c.querySelector('.addr-state') as HTMLInputElement)?.value.trim() || '',
      //     zip: (c.querySelector('.addr-zip') as HTMLInputElement)?.value.trim() || ''
      //   })),
      //   qualifications: this.$$('#tblQual tbody tr').map(r => ({
      //     qualification: (r.cells[0].querySelector('input') as HTMLInputElement)?.value.trim() || '',
      //     institute: (r.cells[1].querySelector('input') as HTMLInputElement)?.value.trim() || '',
      //     year: (r.cells[2].querySelector('input') as HTMLInputElement)?.value.trim() || '',
      //     mostRecent: (r.cells[3].querySelector('input[type="checkbox"]') as HTMLInputElement)?.checked || false
      //   })),
      //   family: this.$$('#tblFamily tbody tr').map(r => ({
      //     fullName: (r.cells[0].querySelector('input') as HTMLInputElement)?.value.trim() || '',
      //     relationship: (r.cells[1].querySelector('select') as HTMLSelectElement)?.value || '',
      //     dob: (r.cells[2].querySelector('input') as HTMLInputElement)?.value || '',
      //     gender: (r.cells[3].querySelector('select') as HTMLSelectElement)?.value || '',
      //     mediclaim: (r.cells[4].querySelector('input[type="checkbox"]') as HTMLInputElement)?.checked || false
      //   })),
      //   career: this.$$('#careerTimeline [data-career]').map(n => {
      //     const inputs = Array.from(n.querySelectorAll('input')) as HTMLInputElement[];
      //     return {
      //       headline: inputs[0]?.value.trim() || (n.textContent || '').split('\n')[0]?.trim() || '',
      //       details: inputs[1]?.value.trim() || ''
      //     };
      //   }),
      //   languages: this.$$('#langList [data-lang]').map(n => ({
      //     language: (n.querySelector('input') as HTMLInputElement)?.value.trim() || '',
      //     level: (n.querySelector('select') as HTMLSelectElement)?.value || '',
      //     notes: (n.querySelectorAll('input')[1] as HTMLInputElement)?.value?.trim?.() || ''
      //   })),
      //   passions: this.$$('#passionChips .chip').map(c => (c.firstChild as Text)?.textContent?.trim() || ''),
      //   skills: this.$$('#skillChips .chip').map(c => (c.firstChild as Text)?.textContent?.trim() || ''),
      //   memberships: this.$$('#memberList [data-member]').map(n => {
      //     const inputs = Array.from(n.querySelectorAll('input')) as HTMLInputElement[];
      //     return { org: inputs[0]?.value.trim() || '', memberId: inputs[1]?.value.trim() || '', since: inputs[2]?.value.trim() || '' };
      //   })
      // };

      // Hook to your APIs here…
      // await fetch('/api/profile/update-direct', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(direct) });
      // await fetch('/api/profile/submit-approval', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(approvals) });

      alert('Saved! (stub)\nDirect fields + approval sections prepared.');
    });
  }

  // ------------ Horizontal tab scroller ------------
  private bindTabScroller() {
    const scroller = this.navScroller?.nativeElement || this.$<HTMLElement>('.nav-scroller');
    const btnLeft = this.btnScrollLeft?.nativeElement || this.$<HTMLButtonElement>('.tab-scroll-left');
    const btnRight = this.btnScrollRight?.nativeElement || this.$<HTMLButtonElement>('.tab-scroll-right');
    if (!scroller || !btnLeft || !btnRight) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scroller;
      btnLeft.disabled = scrollLeft <= 0;
      btnRight.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
      btnLeft.style.opacity = btnLeft.disabled ? '0.35' : '1';
      btnRight.style.opacity = btnRight.disabled ? '0.35' : '1';
    };
    const smoothBy = (delta: number) => scroller.scrollBy({ left: delta, behavior: 'smooth' });

    this.listen(btnLeft, 'click', () => smoothBy(-200));
    this.listen(btnRight, 'click', () => smoothBy(200));
    this.listen(scroller, 'scroll', update);
    this.listen(window, 'resize', update);
    // kick once after view init
    setTimeout(update, 0);
  }
}
