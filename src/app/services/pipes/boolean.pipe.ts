import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: boolean, toReturnString?: string): string {
    return (value) ? 'Habilitado' : 'Inhabilitado';
  }

}
