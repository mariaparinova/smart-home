import { Component, OnDestroy, signal } from '@angular/core';
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
export class Sidebar implements OnDestroy {
  protected isSidebarOpen = signal(true);
  private isMobile = signal(false);
  private mobileMediaQuery = '(max-width: 767px)';
  protected mediaQuery: MediaQueryList | undefined;

  constructor() {
    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia(this.mobileMediaQuery);
      this.handleMobileStateChange(this.mediaQuery.matches);
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }

  ngOnDestroy(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }

  protected toggleSidebar = () => {
    this.isSidebarOpen.update((current) => !current);
  };

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
}
