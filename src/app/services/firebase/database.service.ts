import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ObjectDocument } from '../../classes/docs.class';
import { map } from 'rxjs/operators';
import { ClientServicesService } from '../api/client-services.service';
import { ObjectSoluclicProvider } from 'src/app/classes/providers.class';
import { PartialObserver } from 'rxjs';
import { Coords } from '../../classes/map.class';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public ArrayDocs: ObjectDocument[] = [];
  public ArrayCoordinates: Coords[] = [];
  constructor(private db: AngularFireDatabase, private _client: ClientServicesService) {
    this.GetDocsList().subscribe(
      (object) => {
        this.ArrayDocs = object;
      }
    );
    this.getMapsMarkers().subscribe(
      (objectCoords) => {
        this.ArrayCoordinates = objectCoords;
      }
    );
  }

  GetDocsList() {
    return this.db.list(`documentos`)
    .snapshotChanges()
    .pipe(map(items => {
    return items.map((mapElement: any) => {
      const data: ObjectDocument = mapElement.payload.val();
      const legalModel: ObjectDocument = {
        img: data.img,
        documento: data.documento,
        estado: data.estado,
        client_id: data.client_id,
        key: mapElement.key
      };
      this.GetProviderById(legalModel.client_id).then(
        (client_data) => {
          legalModel.client_id = client_data;
        }
      );
      return legalModel;
    });
  }));
  }
  getDocsByClientId(client_id: number) {
    return this.db.list(`documentos`, ref =>
    ref.orderByChild('client_id')
    .equalTo(client_id))
      .snapshotChanges()
      .pipe(map(items => {
        return items.map((docs: any) => {
          return docs.payload.val();
        });
      }));

  }
  getMapsMarkers() {
    return this.db.list(`sitios`)
      .snapshotChanges()
      .pipe(map(items => {
        return items.map((mapboxMark: any) => {
          return mapboxMark.payload.val();
        });
      }));
  }
  public GetProviderById(customer_id: number): Promise<ObjectSoluclicProvider> {
    return new Promise((resolve, reject) => {
      this._client.InfoClientData('getClient', customer_id).subscribe(
        (observer: PartialObserver<any> | any) => {
          if (observer.status) {
            resolve(observer.data[0]);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  public updateElement(object: ObjectDocument): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.object(`/documentos/${object.key}`).update(object)
          .then(() =>  resolve(true), () => resolve(false));
    });
  }
  public removeElement(object: ObjectDocument): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.object(`/documentos/${object.key}`).remove()
        .then(() => resolve(true), () => resolve(false));
    });
  }
  // Create coords on fb
  public createElement(coordData: Coords): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const key: string = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 10)).toUpperCase();
      coordData.key = key;
      this.db.object(`/sitios/${key}`).update(coordData)
      .then(() => resolve(true), () => resolve(false));
    });
  }
  public createStaticMap(coord: Coords, token: string): string {
    let dataAPI = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-m-marker+285A98`;
    dataAPI += `(${coord.Lng},${coord.Lat})/${coord.Lng},${coord.Lat},13,0/400x400@2x`;
    dataAPI += `?access_token=${token}`;
    return dataAPI;
  }
  public removeMapLocation(objectMap: Coords): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.object(`/sitios/${objectMap.key}`).remove()
        .then(() => resolve(true), () => resolve(false));
    });
  }
}
// https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-m-marker+285A98(-73.7638,42.6564)/-73.7638,42.6564,13,0/600x300@2x
// ?access_token=pk.eyJ1IjoiaW5nY2FybG9zZSIsImEiOiJjanVoNDR3cmkwdnY2NDlwcHE5czU2MmhiIn0._ztgGFw7U3hBvZz9qsMA0A
