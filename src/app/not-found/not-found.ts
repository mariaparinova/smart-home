import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  protected authService = inject(AuthService);
}
