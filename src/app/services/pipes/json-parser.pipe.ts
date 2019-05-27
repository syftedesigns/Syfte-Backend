import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonParser'
})
export class JsonParserPipe implements PipeTransform {

  transform(value: string): string {
    // Devuelve parseado el string
    return JSON.parse(value);
  }

}
