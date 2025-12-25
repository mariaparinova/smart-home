import { Component } from '@angular/core';
import { AppView } from './app-view/app-view';

@Component({
  selector: 'app-root',
  imports: [AppView],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
