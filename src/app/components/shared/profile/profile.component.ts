import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ObjectSoluclicProvider } from '../../../classes/providers.class';
import { ClientServicesService } from '../../../services/api/client-services.service';
import { AddrObject } from '../../../classes/addr.class';
import { PartialObserver } from 'rxjs';
import { DatabaseService } from '../../../services/firebase/database.service';
import { ObjectDocument } from 'src/app/classes/docs.class';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public Profile: ObjectSoluclicProvider;
  public addr: AddrObject = null;
  private ArrayDocs: ObjectDocument[] = [];
  public canActivate: boolean = false;
  public thumbProfile: string = '';
  constructor(public dialog: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObjectSoluclicProvider,
    private _cli: ClientServicesService, private _fb: DatabaseService,
    private _matSnack: MatSnackBar, private _router: Router) {}

  async ngOnInit() {
    this.Profile = this.data;
    // Una vez obtenido el perfil buscamos los datos externos
    setTimeout(async () => {
      const Addr: AddrObject = await this.getAddrData(this.Profile.address_id);
      if (Addr !== null) {
        this.addr = Addr;
      } else {
        this.dialog.close(false);
        throw new Error('No tiene datos suficientes');
      }
    }, 400);
    // Vamos a obtener los documentos cargados de la persona y verificar si estan validados
    // Si alguno no se encuentra validado entonces no podemos activar al usuario

    // Obtenemos los documentos de este cliente
     this.ArrayDocs = await this.GetDocsProvider(Number(this.Profile.customer_id));
     // Sacamos la thumbnail
     this.GetProfileSelfie();
  }
  // Obtenemos todos los datos de ubicación del cliente
  getAddrData(addr_id: number): Promise<AddrObject> {
    return new Promise((resolve, reject) => {
      this._cli.ClientAddr('dataAddr', addr_id)
        .subscribe((_addr: PartialObserver<any> | any): void => {
          if (_addr.status) {
            resolve(_addr.data[0]);
            return;
          } else {
            resolve(null);
          }
        });
    });
  }
  // Obtener los documentos que tenga el cliente
  GetDocsProvider(client_id: number): Promise<ObjectDocument[]> {
    return new Promise((resolve, reject) => {
      this._fb.getDocsByClientId(client_id).subscribe(
        (docs: any): void => {
          if (!docs.length && docs.length <= 0 && docs === '' && docs === undefined) {
            this._matSnack.open('El cliente no ha proporcionado ningún tipo de documento aun.', null, {
              duration: 5000,
              panelClass: ['red-snackbar']
            });
            this.dialog.close(false);
            throw new Error('Sin datos proporcionados');
          } else {
            resolve(docs);
          }
        }
      );
    });
  }
  // Capacitar usuario esto decidirá si puede o no entrar
  activateUser(data: NgForm): void {
    if (data.invalid) {
      throw new Error('El formulario es inválido');
    }
    this._cli.updateProvider('updateDriver', Number(data.value.user_active))
      .subscribe((provider) => {
        if (provider.status) {
          this._matSnack.open('Usuario Configurado con éxito', null, {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.dialog.close(true);
        }
      });
  }
  // Verifica si puede ser activado o no
  canActivateUser(event): void {
    for (const doc of this.ArrayDocs) {
      if (!doc.estado) {
        this._matSnack.open('Debes habilitar todos los documentos', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        this._router.navigate(['/legal']);
        this.dialog.close(false);
        return;
      }
    }
    this.canActivate = true;
  }
  GetProfileSelfie(): void {
    let profile: string;
    for (const data of this.ArrayDocs) {
      if (data.documento === 'selfie') {
        if (data.estado) {
          profile = data.img;
        } else {
          profile = './assets/images/no-image.jpg';
        }
      }
    }
    this.thumbProfile = profile;
  }
}
