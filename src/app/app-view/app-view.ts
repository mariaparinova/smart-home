import { Component, inject } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-view',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app-view.html',
  styleUrl: './app-view.scss',
})
export class AppView {
  authService = inject(AuthService);
  isUserAuthenticated = this.authService.isAuthenticated;
}
