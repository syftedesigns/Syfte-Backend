import { Component, OnInit } from '@angular/core';
import { Map, MapMouseEvent } from 'mapbox-gl';
import { Coords } from '../../../classes/map.class';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../../services/firebase/database.service';

@Component({
  selector: 'app-store-coords',
  templateUrl: './store-coords.component.html',
  styleUrls: ['./store-coords.component.css']
})
export class StoreCoordsComponent implements OnInit {
  map: Map;
  CoordsMarkers: Coords[] = [];
  TypeMarker: string = '';
  constructor(private matSnack: MatSnackBar, private _fb: DatabaseService,
    private ref: MatDialogRef<StoreCoordsComponent>) { }

  ngOnInit() {
  }
  satelitalMap(event: MapMouseEvent): void {
    if (this.TypeMarker === '') {
      this.matSnack.open('Debes elegir un tipo de punto de interés primero', null, {
        duration: 3000,
        panelClass: ['red-snackbar']
      });
      return;
    }
    // Creamos un nuevo marcador
    const marker: Coords = new Coords(event.lngLat.lat, event.lngLat.lng, this.TypeMarker);
    this.CoordsMarkers.push(marker);
    console.log(this.CoordsMarkers);
  }
  RemoveMarker(index: number): void {
    this.CoordsMarkers.splice(index, 1);
    return;
  }
  async addPointersMap(valueTypeMarker: NgForm) {
    if (valueTypeMarker.invalid) {
      throw new Error('El formulario es inválido');
    }
    if ((!this.CoordsMarkers.length) || (this.CoordsMarkers.length <= 0)) {
      this.matSnack.open('Debes cargar puntos de interés', null, {
        duration: 3000,
        panelClass: ['red-snackbar']
      });
      return;
    } else {
      // Barremos todo el arreglo de marcadores que creamos y lo insertamos a firebase
      for (const markerPoint of this.CoordsMarkers) {
        const marker = await this._fb.createElement(markerPoint);
        if (!marker) {
          this.matSnack.open('Fallo en la operación', null, {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
          this.CoordsMarkers = [];
          this.ref.close();
          throw new Error('Fallo en la operación');
        }
      }
      this.CoordsMarkers = [];
      this.ref.close();
    }
  }
}
