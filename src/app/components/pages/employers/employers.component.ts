import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ClientServicesService } from '../../../services/api/client-services.service';
import { PartialObserver } from 'rxjs';
import { AffiliationClass } from '../../../classes/affiliation.class';
import { SendMarketingComponent } from '../../shared/send-marketing/send-marketing.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'campaign', 'date', 'action'];
  temporalTable: AffiliationClass[] = [];
  dataSource = new MatTableDataSource<AffiliationClass>();
  constructor(public dialog: MatDialog, private _cli: ClientServicesService,
    private matSnack: MatSnackBar) {
  }

  async ngOnInit() {
    const ArrayCli: AffiliationClass[] = await this.LoadProviders();
    if (ArrayCli !== null) {
      this.temporalTable = ArrayCli;
      this.dataSource.data = this.temporalTable;
      this.dataSource._updateChangeSubscription();
    }
  }
  popupProfile(customer: AffiliationClass): void {
  const modalProfile = this.dialog.open(SendMarketingComponent, {
      width: '800px',
      height: '500px',
      data: customer
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
  LoadProviders(): Promise<AffiliationClass[]> {
    return new Promise((resolve, reject) => {
      this._cli.InfoClientData('GetCustomer').subscribe(
        (_Customers: PartialObserver<any> | any): void => {
          if (_Customers.status) {
            resolve(_Customers.clients);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  // Remove Subscription
  ModalRemoveSubscription(customer: AffiliationClass, index: number): void {
    swal({
      title: 'Estás seguro?',
      text: 'Si cancelas la subscripción de este cliente, no podrás enviarle mas correos',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const deleted = await this.RemoveSubscription(customer);
        if (deleted) {
          this.temporalTable.splice(index, 1);
          this.dataSource.data = this.temporalTable;
          this.matSnack.open('Datos actualizados', null, {duration: 3000});
        }
      }
    });
  }
  RemoveSubscription(customer: AffiliationClass): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._cli.InfoClientData('delete', customer.client_id)
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
