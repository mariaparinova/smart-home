import { Component } from '@angular/core';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarFooter } from './sidebar-footer/sidebar-footer';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarHeader, SidebarMenu, SidebarFooter],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: { class: 'sidebar' },
})
export class Sidebar {}
