import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  transform(photo: string): string {
    if (photo !== '') {
      return photo;
    } else {
      return './assets/images/no-image.jpg';
    }
  }

}
