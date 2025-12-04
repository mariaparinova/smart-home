import { Component, signal } from '@angular/core';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarFooter } from './sidebar-footer/sidebar-footer';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarHeader, SidebarMenu, SidebarFooter],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[class.sidebar-closed]': '!isSidebarOpen()',
  },
})
export class Sidebar {
  isSidebarOpen = signal(true);

  toggleSidebar = () => {
    this.isSidebarOpen.update((current) => !current);
  };
}
