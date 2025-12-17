import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SensorValuePipe } from '../../../../../pipes/sensor-value-pipe/sensor-value-pipe';
import { SensorData } from '../../../../../dashboard/models/dashboard.models';

@Component({
  selector: 'app-single-card-sensor',
  imports: [MatIcon, SensorValuePipe],
  templateUrl: './single-card-sensor.html',
  styleUrl: './single-card-sensor.scss',
  host: {
    class: 'single-card-content',
  },
})
export class SingleCardSensor {
  singleCardSensorData = input.required<SensorData>();
}
