import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-footer',
  imports: [NgOptimizedImage, MatIcon, MatIconButton],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  authService = inject(AuthService);
  user = this.authService.user;
  logout() {
    this.authService.logout();
  }
}
