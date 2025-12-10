import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  menuItems = [
    { id: 'overview', title: 'Overview', iconName: 'dashboard', linkTo: '/dashboard' },
    { id: 'about', title: 'About', iconName: 'info', linkTo: '/about' },
  ];
}
