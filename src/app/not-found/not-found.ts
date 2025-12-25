import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  authService = inject(AuthService);
  user = this.authService.user;
}
