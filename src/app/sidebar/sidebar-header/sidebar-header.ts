import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-sidebar-header',
  imports: [MatIcon, MatIconButton],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss',
})
export class SidebarHeader {
  isSidebarOpen = input.required<boolean>();
  toggleSidebar = input.required<() => void>();
}
