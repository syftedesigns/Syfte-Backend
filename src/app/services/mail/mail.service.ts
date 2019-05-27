import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { API_SYFTE } from 'src/app/global/enviroment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ObjectService } from 'src/app/classes/services.class';
import { SyfteInboxClass } from '../../classes/mail/inbox.class';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }

  // Función que se encarga de repartir los mensajes de Sendgrid
  public MsgAutomation(msgToUrlType: string, objectCustomer: SyfteInboxClass) {
    const url = `../../sendgrid/mail-marketing/${msgToUrlType}-msg.php`;
    const form = new FormData();
    form.append('NAME', objectCustomer.client_name);
    form.append('EMAIL', objectCustomer.client_email);
    form.append('SUBJECT', objectCustomer.subject);
    form.append('MESSAGE', objectCustomer.message);
    // Evaluamos si contiene adjunto
    if (objectCustomer.file) {
      form.append('attachment', objectCustomer.file, objectCustomer.file.name);
    }
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Tenemos problemas para realizar esta operación, Inténtalo más tarde', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
}
