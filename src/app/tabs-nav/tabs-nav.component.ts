import { Component, HostListener } from '@angular/core';

interface TabItem {
  id: string;
  icon: string;     // e.g. 'ni ni-badge'
  label: string;
  href: string;     // e.g. '#tab-overview'
}

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.css']
})
export class TabsNavComponent {
  items: TabItem[] = [
    { id: 'overview',       icon: 'ni ni-badge',         label: 'Overview',        href: '#tab-overview' },
    { id: 'career',         icon: 'ni ni-briefcase-24',  label: 'Career Journey',  href: '#tab-career' },
    { id: 'languages',      icon: 'ni ni-world',         label: 'Languages',       href: '#tab-languages' },
    { id: 'passions',       icon: 'ni ni-favourite-28',  label: 'Passions',        href: '#tab-passions' },
    { id: 'docs',           icon: 'ni ni-folder-17',     label: 'Documents',       href: '#tab-docs' },
    { id: 'skills',         icon: 'ni ni-hat-3',         label: 'Skills',          href: '#tab-skills' },
    { id: 'qualifications', icon: 'ni ni-paper-diploma', label: 'Qualifications',  href: '#tab-qualifications' },
    { id: 'family',         icon: 'ni ni-circle-08',     label: 'Family',          href: '#tab-family' },
    { id: 'memberships',    icon: 'ni ni-badge',         label: 'Memberships',     href: '#tab-memberships' }
  ];

  // how many to show inline (left)
  visibleCount = 3;

  searchTerm = '';
  dropdownOpen = false;

  get leftItems(): TabItem[] {
    return this.items.slice(0, this.visibleCount);
  }

  get filtered(): TabItem[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.items;
    return this.items.filter(t =>
      t.label.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
    );
  }

  openDropdown() { this.dropdownOpen = true; }
  closeDropdownSoon() { setTimeout(() => this.dropdownOpen = false, 120); }

  selectItem(_item: TabItem) {
    // If you want to auto-focus the tab, Bootstrap pill will handle via href.
    this.dropdownOpen = false;
  }

  @HostListener('window:resize')
  onResize() {
    // keep it simple; no special behavior needed here
  }
}
