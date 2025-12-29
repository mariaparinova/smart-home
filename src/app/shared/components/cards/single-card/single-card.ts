import { Component, input, OnInit, signal } from '@angular/core';
import { SingleCardSensor } from './single-card-sensor/single-card-sensor';
import { SingleCardDevice } from './single-card-device/single-card-device';
import { Card, Device, Sensor } from '../../../models/dashboard.models';

@Component({
  selector: 'app-single-card',
  imports: [SingleCardSensor, SingleCardDevice],
  templateUrl: './single-card.html',
  styleUrl: './single-card.scss',
})
export class SingleCard implements OnInit {
  tabId = input.required<string>();
  singleCard = input.required<Card>();
  sensor = signal<Sensor | undefined>(undefined);
  device = signal<Device | undefined>(undefined);

  ngOnInit() {
    const firstItem = this.singleCard().items[0];

    if (firstItem.type === 'sensor') {
      this.sensor.set(firstItem);
      return;
    }

    this.device.set(firstItem);
  }
}
