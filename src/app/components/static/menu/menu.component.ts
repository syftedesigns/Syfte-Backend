import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
// import { SOLUCLIC_GALLERY } from '../../../global/enviroment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  Thumbnail: string = '';
  constructor(public _auth: AuthService) { }

  ngOnInit() {
    /*setTimeout(() => {
      const thumbnail = this._auth.userData.image;
      if (thumbnail !== '' && thumbnail !== null && thumbnail !== undefined) {
        this.Thumbnail = `${SOLUCLIC_GALLERY}/${thumbnail}`;
      }
    }, 500);*/
  }

}
