import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SensorValuePipe } from '../../../../../pipes/sensor-value-pipe/sensor-value-pipe';
import { Sensor } from '../../../../models/dashboard.models';

@Component({
  selector: 'app-multi-card-sensor',
  imports: [MatIcon, SensorValuePipe],
  templateUrl: './multi-card-sensor.html',
  styleUrl: './multi-card-sensor.scss',
  host: {
    class: 'multi-card-content',
    '[class.vertical-layout]': 'isVerticalLayout()',
  },
})
export class MultiCardSensor {
  multiCardSensor = input.required<Sensor>();
  isVerticalLayout = input.required<boolean>();
}
