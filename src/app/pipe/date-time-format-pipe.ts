import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: string, includeTime: boolean = false): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    if (includeTime) {
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  }
}