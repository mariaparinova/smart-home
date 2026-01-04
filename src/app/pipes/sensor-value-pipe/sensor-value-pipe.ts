import { Pipe, PipeTransform } from '@angular/core';
import { Sensor } from '../../shared/models/dashboard.models';

@Pipe({
  name: 'sensorValue',
})
export class SensorValuePipe implements PipeTransform {
  transform(value: Sensor['value']): string {
    return `${value.amount} ${value.unit}`;
  }
}
