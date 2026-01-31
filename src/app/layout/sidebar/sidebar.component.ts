import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
ngAfterViewInit(): void {
    // Smooth Scrollbar (global from smooth-scrollbar.min.js)
    const win = window as any;
    const el = document.querySelector('#sidenav-collapse-main');
    const isWin = navigator.platform.indexOf('Win') > -1;
    if (isWin && el && win.Scrollbar?.init) {
      win.Scrollbar.init(el, { damping: 0.5 });
    }

  }
}
