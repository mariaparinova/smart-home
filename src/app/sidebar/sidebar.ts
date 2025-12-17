import { Component, signal } from '@angular/core';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarFooter } from './sidebar-footer/sidebar-footer';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

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
  isMobile = signal(false);

  constructor() {
    this.addMediaQueryListener();
  }

  private handleMobileStateChange(isCurrentMobile: boolean) {
    this.isMobile.set(isCurrentMobile);

    if (isCurrentMobile) {
      this.isSidebarOpen.set(false);
    } else {
      this.isSidebarOpen.set(true);
    }
  }

  private addMediaQueryListener() {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

      this.handleMobileStateChange(mediaQuery.matches);

      mediaQuery.addEventListener('change', (event) => {
        this.handleMobileStateChange(event.matches);
      });
    }
  }

  toggleSidebar = () => {
    this.isSidebarOpen.update((current) => !current);
  };
}
