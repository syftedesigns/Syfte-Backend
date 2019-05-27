import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserAdminModel } from '../../../../classes/userAdmin.class';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  Admin: UserAdminModel = null;
  constructor(private _matRef: MatDialogRef<UpdateAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserAdminModel, private _auth: AuthService,
    private _matSnack: MatSnackBar) {
      this.Admin = this.data;
    }

  ngOnInit() {
  }
  UpdateAdmin(value: NgForm): void {
    if (value.invalid) {
      throw new Error('El formulario es inválido');
    }
    const admin: UserAdminModel = new UserAdminModel(null, null, value.value.admin_email, null,
      value.value.admin_priority, this.Admin.admin);
      this._auth.CreateNewAdmin(admin, `updateAdmin&admin_id=${this.Admin.admin}`)
        .subscribe((updated) => {
          if (updated.status) {
            this._matSnack.open('Administrador Actualizado', null, {
              duration: 4000,
              panelClass: ['success-snackbar']
            });
            this._matRef.close(true);
          } else {
            this._matSnack.open('No pudo actualizar el administrador', null, {
              duration: 4000,
              panelClass: ['red-snackbar']
            });
            this._matRef.close(false);
          }
        });
  }
}
