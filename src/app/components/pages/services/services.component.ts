import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { EditServicesComponent } from '../../shared/edit-services/edit-services.component';
import { ObjectService } from '../../../classes/services.class';
import { ClientServicesService } from '../../../services/api/client-services.service';
import { PartialObserver } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  displayedColumns: string[] = ['#', 'Service', 'action'];
  temporalTable: ObjectService[] = [];
  dataSource = new MatTableDataSource<ObjectService>();
  constructor(public dialog: MatDialog, private _srv: ClientServicesService,
    private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    const Service: ObjectService[] = await this.loadServices();
    if (!Service) {
      console.log('no hay datos');
      return;
    } else {
      this.dataSource.data = Service;
      this.temporalTable = Service;
      console.log(this.temporalTable);
    }
  }
  editService(objectService: ObjectService = null) {
    const modalProfile = this.dialog.open(EditServicesComponent, {
      width: '400px',
      height: '220px',
      data: objectService
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
            // updating
            for (const row of this.temporalTable) {
              if (row.srv_id === result.data.srv_id) {
                row.srv_name = result.data.srv_name;
              }
            }
            this.dataSource.data = this.temporalTable;
            this.dataSource._updateChangeSubscription();
          }
        }
      }
    );
  }
  loadServices(): Promise<ObjectService[]> {
    return new Promise((resolve, reject) => {
      this._srv.selectRole('selectServices').subscribe(
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
  ConfirmDeleteItem(objectSrv: ObjectService): Promise<boolean> {
    return new Promise((resolve, reject) => {
      swal({
        title: 'Estás seguro?',
        text: 'Esta opción no se puede deshacer',
        icon: 'warning',
        buttons: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this._srv.removeRole('removeService', objectSrv.srv_id)
            .subscribe(deleted => {
                if (deleted.status) {
                  this.temporalTable.splice(this.temporalTable.indexOf(objectSrv), 1);
                  this.dataSource.data = this.temporalTable;
                  this.dataSource._updateChangeSubscription();
                  this.snackBar.open('Servicio eliminado', null, {
                    duration: 3000
                  });
                }
            });
        }
      });
    });
  }
}
