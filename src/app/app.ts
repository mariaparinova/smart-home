import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.sidebar-closed]': '!isSidebarOpen()',
  },
})
export class App {
  isSidebarOpen = signal(true);

  toggleSidebar = () => {
    this.isSidebarOpen.update((current) => !current);
  };
}
