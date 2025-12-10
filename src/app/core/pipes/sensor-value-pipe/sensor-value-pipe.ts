import { Pipe, PipeTransform } from '@angular/core';
import { SensorData } from '../../global-store/global-store';

@Pipe({
  name: 'sensorValue',
})
export class SensorValuePipe implements PipeTransform {
  transform(value: SensorData['value']): string {
    return `${value.amount} ${value.unit}`;
  }
}
