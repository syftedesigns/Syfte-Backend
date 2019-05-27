import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ObjectRol } from '../../../classes/rol.class';
import { NgForm } from '@angular/forms';
import { RolesService } from '../../../services/api/roles.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  public updatingRole: boolean = false;
  public RoleName: string = '';
  rol_id: number = 0;
  constructor(public dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObjectRol, private _rol: RolesService) {
      if (data) {
        this.updatingRole = true;
        this.RoleName = data.role_name;
        this.rol_id = data.role_id;
      } else {
        return;
      }
    }

  ngOnInit() {
  }
  createNewRole(formValue: NgForm): void {
    if (formValue.invalid) {
      throw new Error('Formulario inválido');
    }
    const newInserction: ObjectRol = new ObjectRol(formValue.value.ROL_NAME, formValue.value.role_id);
    if (this.updatingRole) {
      this._rol.insertOrUpdateRole('updateRole', newInserction, newInserction.role_id)
        .subscribe((rol: any) => {
          if (rol.status) {
            const returningData = {
              updating: true,
              data: newInserction
            };
            this.dialogRef.close(returningData);
          }
        });
    } else {
      this._rol.insertOrUpdateRole('createRole', newInserction).subscribe(
        (observer: any) => {
          if (observer.status) {
            const returningData = {
              updating: false,
              data: new ObjectRol(newInserction.role_name, observer.data)
            };
            this.dialogRef.close(returningData);
          }
        }
      );
    }
  }

}
