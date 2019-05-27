import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAdminModel } from '../../classes/userAdmin.class';
import { API_SYFTE } from 'src/app/global/enviroment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username: string;
  public user_id: number | string;
  public userData: UserAdminModel;
  constructor(private _http: HttpClient, private snackBar: MatSnackBar, private _router: Router) {
    this.loadStorage();
  }

  public  logged(): boolean {
    if (this.user_id === '' || this.user_id === undefined || this.user_id === null) {
      return false;
    } else {
      return true;
    }
  }
  // Autenticar
  loginAdmin(admin: UserAdminModel, operationType: string) {
    const url = `${API_SYFTE}/login.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('admin_email', admin.admin_email);
    form.append('admin_pwd', admin.admin_pwd);
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
  // Crear/Actualizar nuevos administradores
  CreateNewAdmin(admin: UserAdminModel, operationType: string, isNew?: boolean) {
    const url = `${API_SYFTE}/login.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('admin_email', admin.admin_email);
    form.append('admin_username', admin.admin_user);
    form.append('admin_name', admin.admin_name);
    form.append('admin_priority', admin.admin_priority.toString());
    if (isNew) {
      form.append('admin_pwd', admin.admin_pwd);
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
  ControlAdmin(operationType: string, admin_id?: number) {
    let url;
    if (admin_id) {
      url = `${API_SYFTE}/login.php?operationType=${operationType}&admin_id=${admin_id}`;
    } else {
      url = `${API_SYFTE}/login.php?operationType=${operationType}`;
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
  // Save data
  saveStorage(admin: UserAdminModel, username: string, id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('username', username);
      localStorage.setItem('_id', id);
      this.userData = admin;
      this.user_id = id;
      this.username = username;
      resolve(true);
    });
  }
  loadStorage() {
    this.userData = JSON.parse(localStorage.getItem('admin')) || null;
    this.username = localStorage.getItem('username') || '';
    this.user_id = localStorage.getItem('_id') || '';
  }
  logout() {
    localStorage.removeItem('admin');
    localStorage.removeItem('username');
    localStorage.removeItem('_id');
    this.userData = null;
    this.user_id = '';
    this.username = '';
    this._router.navigate(['/login']);
    this.snackBar.open('Has salido del panel administrativo', null, {
      duration: 5000
    });
  }
}
