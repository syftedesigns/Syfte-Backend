import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { StoreCoordsComponent } from '../../../shared/store-coords/store-coords.component';
import { DatabaseService } from '../../../../services/firebase/database.service';
import { Coords } from '../../../../classes/map.class';
import { environment } from '../../../../../environments/environment';
import { StaticMapComponent } from 'src/app/components/shared/store-coords/static-map.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: []
})
export class MapComponent implements OnInit {
  displayedColumns: string[] = ['Punto', 'Latitud', 'Longitud', 'action'];
  temporalTable: Coords[] = [];
  dataSource = new MatTableDataSource<Coords>();
  constructor(public dialog: MatDialog, private _fb: DatabaseService, private matSnack: MatSnackBar) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.temporalTable = this._fb.ArrayCoordinates;
      this.dataSource.data = this.temporalTable;
      this.dataSource._updateChangeSubscription();
    }, 1500);
  }
  popupStoreFront() {
    const modalProfile = this.dialog.open(StoreCoordsComponent, {
      width: '1024px',
      height: '800px'
    });

    // Para estar a la escucha de cuando cierre el modal
    modalProfile.afterClosed().subscribe(
      (): void => {
        this.temporalTable = [];
        this.dataSource.data = null;
        setTimeout(() => {
          this.temporalTable = this._fb.ArrayCoordinates;
          this.dataSource.data = this.temporalTable;
        }, 300);
        this.matSnack.open('Datos actualizados', null, {duration: 3000});
      }
    );
  }
  /*viewMapStatic(objectMap: Coords): void {
    const dataMap = this._fb.createStaticMap(objectMap, environment.mapbox.token);
    this.dialog.open(StaticMapComponent, {
      width: '800px',
      height: '400px',
      data: dataMap
    });
  }*/
  deleteLocation(objectMap: Coords, index: number): void {
    swal({
      title: 'Estás seguro?',
      text: 'Al eliminar este marcador no podrán visualizarlo en la app delivery',
      icon: 'warning',
      buttons: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const deleted: boolean = await this._fb.removeMapLocation(objectMap);
        if (deleted) {
          this.temporalTable.splice(index, 1);
          this.dataSource.data = this.temporalTable;
          this.matSnack.open('Datos actualizados', null, {
            duration: 3000
          });
        }
      }
    });
  }
}
