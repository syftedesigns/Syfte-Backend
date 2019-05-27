import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { PartialObserver } from 'rxjs';
import swal from 'sweetalert';
import { UserAdminModel } from '../../../classes/userAdmin.class';
import { AuthService } from '../../../services/auth/auth.service';
import { AdminModalComponent } from '../../shared/admin/admin.component';
import { UpdateAdminComponent } from '../../shared/admin/update-admin/update-admin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'priority', 'action'];
  temporalTable: UserAdminModel[] = [];
  dataSource = new MatTableDataSource<UserAdminModel>();
  constructor(public dialog: MatDialog,
    private matSnack: MatSnackBar, private _admin: AuthService) {
  }

  async ngOnInit() {
    const ArrayCli: UserAdminModel[] = await this.LoadProviders();
    console.log(ArrayCli);
    if (ArrayCli !== null) {
      this.temporalTable = ArrayCli;
      this.dataSource.data = this.temporalTable;
      this.dataSource._updateChangeSubscription();
    }
  }
  // Actualizar el admin
  popupProfile(admin: UserAdminModel): void {
  const modalProfile = this.dialog.open(UpdateAdminComponent, {
      width: '500px',
      height: '220px',
      data: admin
    });

    // Para estar a la escucha de cuando cierre el modal
    modalProfile.afterClosed().subscribe(
      async (result: boolean) => {
        if (result) {
          this.temporalTable = await this.LoadProviders();
          this.dataSource.data = this.temporalTable;
          this.dataSource._updateChangeSubscription();
        }
      }
    );
  }
  // Crear nuevo admin
  CreateAdmin(): void {
    const admin = this.dialog.open(AdminModalComponent, {
      width: '500px',
      height: '500px',
      autoFocus: false
    });
    admin.afterClosed().subscribe(
      async (created: boolean) => {
        if (created) {
          this.temporalTable = await this.LoadProviders();
          this.dataSource.data = this.temporalTable;
          this.dataSource._updateChangeSubscription();
        }
      }
    );
  }
  // Cargar administradores
  LoadProviders(): Promise<UserAdminModel[]> {
    return new Promise((resolve, reject) => {
      this._admin.ControlAdmin('getAdmins').subscribe(
        (_admins: PartialObserver<any> | any): void => {
          if (_admins.status) {
            resolve(_admins.data);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  // Remove Subscription
  ModalRemoveSubscription(customer: UserAdminModel, index: number): void {
    swal({
      title: 'Estás seguro?',
      text: 'Si cancelas la subscripción de este cliente, no podrás enviarle mas correos',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const deleted = await this.RemoveAdmin(customer);
        if (deleted) {
          this.temporalTable.splice(index, 1);
          this.dataSource.data = this.temporalTable;
          this.matSnack.open('Datos actualizados', null, {duration: 3000});
        }
      }
    });
  }
  RemoveAdmin(objectAdmin: UserAdminModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._admin.ControlAdmin('removeAdmin', objectAdmin.admin)
        .subscribe((affiliation): void => {
          if (affiliation.status) {
            resolve(true);
            return;
          } else {
            resolve(false);
          }
        }, (err) => {
          this.matSnack.open('Error al sincronizar con el sistema de Syfte, inténtalo más tarde', null, {
            panelClass: ['red-snackbar'],
            duration: 3000
          });
          throw new Error(`Fallo al realizar esta operación por ${err}`);
        });
    });
  }

}
