import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SensorData } from '../../../../global-store/global-store';
import { SensorValuePipe } from '../../../../pipes/sensor-value-pipe/sensor-value-pipe';

@Component({
  selector: 'app-multi-card-sensor',
  imports: [MatIcon, SensorValuePipe, SensorValuePipe],
  templateUrl: './multi-card-sensor.html',
  styleUrl: './multi-card-sensor.scss',
  host: {
    class: 'multi-card-content',
    '[class.vertical-layout]': 'isVerticalLayout()',
  },
})
export class MultiCardSensor {
  data = input.required<SensorData>();
  isVerticalLayout = input.required<boolean>();
}
