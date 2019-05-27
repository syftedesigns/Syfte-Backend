import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { API_SYFTE } from 'src/app/global/enviroment';
import { MatSnackBar } from '@angular/material';
import { ObjectRol } from '../../classes/rol.class';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }

  public selectRole(operationType: string, rol_id?: number) {
    let url: string;
    if (rol_id) {
      url = `${API_SYFTE}/roles.php?operationType=${operationType}&role_id=${rol_id}`;
    } else {
      url = `${API_SYFTE}/roles.php?operationType=${operationType}`;
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
  public insertOrUpdateRole(operationType: string, role: ObjectRol, role_id?: number) {
    const url = `${API_SYFTE}/roles.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('ROL_NAME', role.role_name);
    if (role_id) {
      // es un update
      form.append('role_id', role_id.toString());
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
    const url = `${API_SYFTE}/roles.php?operationType=${operationType}&role_id=${role_id}`;
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
}
