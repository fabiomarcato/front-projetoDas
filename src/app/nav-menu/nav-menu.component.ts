import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  expandido = false;

  collapse() {
    this.expandido = false;
  }

  toggle() {
    this.expandido = !this.expandido;
  }
}
