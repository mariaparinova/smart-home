import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private route: ActivatedRoute = inject(ActivatedRoute);
  activeMenuitemId = signal('');

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.activeMenuitemId.set(id || 'overview');
    });
  }
}
