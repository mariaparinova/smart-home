import { Component, OnDestroy, signal } from '@angular/core';
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
export class Sidebar implements OnDestroy {
  isSidebarOpen = signal(true);
  isMobile = signal(false);
  mediaQuery: MediaQueryList | undefined;

  constructor() {
    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
      this.handleMobileStateChange(this.mediaQuery.matches);
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }

  ngOnDestroy(): void {
    if (this?.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }

  private handleMobileStateChange(isCurrentMobile: boolean) {
    this.isMobile.set(isCurrentMobile);

    if (isCurrentMobile) {
      this.isSidebarOpen.set(false);
    } else {
      this.isSidebarOpen.set(true);
    }
  }

  private mediaQueryListener = (event: MediaQueryListEvent) => {
    this.handleMobileStateChange(event.matches);
  };

  toggleSidebar = () => {
    this.isSidebarOpen.update((current) => !current);
  };
}
