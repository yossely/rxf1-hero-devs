import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'rxf1-hero-devs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input()
  drawer!: MatDrawer;
}
