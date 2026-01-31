import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
openSettings()
{
  const fixedPlugin = document.querySelector('.fixed-plugin');
  if (fixedPlugin) {
    fixedPlugin.classList.toggle('show');
  }
  const fixedPluginCloseButton = document.querySelector('.fixed-plugin-close-button');
  if (fixedPluginCloseButton) {
    fixedPluginCloseButton.addEventListener('click', () => {
      fixedPlugin?.classList.remove('show');
    });
}
}
}
