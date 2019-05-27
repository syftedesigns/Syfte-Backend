import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.logged()) {
      return true;
    } else {
     this._router.navigate(['/login']);
     return false;
    }
 }
 constructor(private _router: Router, private auth: AuthService) {}
}
