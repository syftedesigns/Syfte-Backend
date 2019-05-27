import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { API_SYFTE } from 'src/app/global/enviroment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ObjectService } from 'src/app/classes/services.class';

@Injectable({
  providedIn: 'root'
})
export class ClientServicesService {

  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }

  public selectRole(operationType: string, srv_id?: number) {
    let url: string;
    if (srv_id) {
      url = `${API_SYFTE}/services.php?operationType=${operationType}&srv_id=${srv_id}`;
    } else {
      url = `${API_SYFTE}/services.php?operationType=${operationType}`;
    }
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Insertar y actualizar
  public insertOrUpdateRole(operationType: string, service: ObjectService, role_id?: number) {
    const url = `${API_SYFTE}/services.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('SRV_NAME', service.srv_name);
    if (role_id) {
      // es un update
      form.append('srv_id', role_id.toString());
    }
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Remove rol
  public removeRole(operationType: string, role_id: number) {
    const url = `${API_SYFTE}/services.php?operationType=${operationType}&srv_id=${role_id}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Información del cliente
  public InfoClientData(operationType: string, customer_id?: number) {
    // Verificamos si hace la busqueda por ID, o global
    let url;
    if (customer_id) {
      url = `${API_SYFTE}/affiliation.php?operationType=${operationType}&cli_id=${customer_id}`;
    } else {
      url = `${API_SYFTE}/affiliation.php?operationType=${operationType}`;
    }
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  public ClientAddr(operationType: string, addr_id: number) {
    const url = `${API_SYFTE}/providers.php?operationType=${operationType}&addr_id=${addr_id}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Activar | Desactivar un usuario
  public updateProvider(operationType: string, status: number) {
    const url = `${API_SYFTE}/providers.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('STATUS', status.toString());
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
}
