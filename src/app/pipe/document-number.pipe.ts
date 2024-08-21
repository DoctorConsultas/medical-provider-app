import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentNumber'
})
export class DocumentNumberPipe implements PipeTransform {

  transform(document: any): string {
    if (typeof document === 'string') {
      const match = document.match(/"number"\s*:\s*"([^"]+)"/);
      return match ? match[1] : '';
    }
    return document?.number || '';
  }

}
