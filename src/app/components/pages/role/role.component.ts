import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { EditRoleComponent } from '../../shared/edit-role/edit-role.component';
import { RolesService } from '../../../services/api/roles.service';
import { ObjectRol } from '../../../classes/rol.class';
import { PartialObserver } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styles: []
})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['#', 'Rol', 'action'];
  temporalTable: ObjectRol[] = [];
  dataSource = new MatTableDataSource<ObjectRol>();
  constructor(public dialog: MatDialog, private _rol: RolesService, private snackBar: MatSnackBar) {
    // this.dataSource = this.ELEMENT_DATA;

  }

  async ngOnInit() {
   const Rol: ObjectRol[] = await this.loadRols();
   if (!Rol) {
     console.log('No hay datos');
     return;
   } else {
     this.dataSource.data = Rol;
     this.temporalTable = Rol;
     console.log(this.dataSource);
   }
  }
  editRole(objectRol: ObjectRol = null) {
    const modalProfile = this.dialog.open(EditRoleComponent, {
      width: '400px',
      height: '220px',
      data: objectRol
    });

    // Para estar a la escucha de cuando cierre el modal
    modalProfile.afterClosed().subscribe(
      (result: any): void => {
        if (result) {
          if (!result.updating) {
            this.temporalTable.push(result.data);
            this.dataSource.data = this.temporalTable;
            this.dataSource._updateChangeSubscription();
          } else {
            // Updating row
            for (const row of this.temporalTable) {
              if (row.role_id === result.data.role_id) {
                row.role_name = result.data.role_name;
              }
            }
            this.dataSource.data = this.temporalTable;
            this.dataSource._updateChangeSubscription();
          }
        }
      }
    );
  }
  loadRols(): Promise<ObjectRol[]> {
    return new Promise((resolve, reject) => {
      this._rol.selectRole('selectRoles').subscribe(
        (resp: PartialObserver<any> | any): void => {
          if (resp.status) {
            resolve(resp.data);
            return;
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  ConfirmDeleteItem(objectRol: ObjectRol): Promise<boolean> {
    return new Promise((resolve, reject) => {
      swal({
        title: 'Estás seguro?',
        text: 'Esta opción no se puede deshacer',
        icon: 'warning',
        buttons: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this._rol.removeRole('removeRole', objectRol.role_id)
            .subscribe(deleted => {
                if (deleted.status) {
                  this.temporalTable.splice(this.temporalTable.indexOf(objectRol), 1);
                  this.dataSource.data = this.temporalTable;
                  this.dataSource._updateChangeSubscription();
                  this.snackBar.open('Rol eliminado', null, {
                    duration: 3000
                  });
                }
            });
        }
      });
    });
  }
}
