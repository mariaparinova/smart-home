import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-header',
  imports: [MatIcon],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss',
})
export class SidebarHeader {
  isSidebarOpen = input.required<boolean>();
  toggleSidebar = input.required<() => void>();
}
