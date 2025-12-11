import { Pipe, PipeTransform } from '@angular/core';
import { SensorData } from '../../dashboard/dashboard.interfaces';

@Pipe({
  name: 'sensorValue',
})
export class SensorValuePipe implements PipeTransform {
  transform(value: SensorData['value']): string {
    return `${value.amount} ${value.unit}`;
  }
}
