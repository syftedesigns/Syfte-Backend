import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { UserAdminModel } from '../../../classes/userAdmin.class';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminModalComponent implements OnInit {
  public PasswordGenerated: string = '';
  public loader: boolean = false;
  constructor(private _admin: AuthService, private _ref: MatDialogRef<AdminModalComponent>,
    private _matSnack: MatSnackBar) { }

  ngOnInit() {
  }

  PwdGenerator(length: number): void {
    const Characters = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789';
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += Characters.charAt(Math.floor(Math.random() * Characters.length));
    }
    this.PasswordGenerated = pwd;
  }
  CreateNewAdmin(admin: NgForm): void {
    if (admin.invalid) {
      throw new Error('Formulario inválido');
    }
    this.loader = true;
    // Creamos un nuevo administrador
    const adminModel: UserAdminModel = new UserAdminModel(admin.value.admin_username,
      admin.value.admin_pwd, admin.value.admin_email, admin.value.admin_name,
      admin.value.admin_priority);
      this._admin.CreateNewAdmin(adminModel, 'newAdmin', true)
        .subscribe((inserted) => {
          if (inserted.status) {
            this.loader = false;
            this._matSnack.open('Nuevo administrador asignado', null, {
              duration: 4000,
              panelClass: ['success-snackbar']
            });
            this._ref.close(inserted.data);
          } else {
            this.loader = false;
            admin.reset();
            this._matSnack.open('Ya existe este administrador', null, {
              duration: 4000,
              panelClass: ['red-snackbar']
            });
          }
        });
  }
}

