import { Component, OnInit } from '@angular/core';
import { DocumentsApprovalComponent } from '../../../shared/documents-approval/documents-approval.component';
import { DatabaseService } from '../../../../services/firebase/database.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ObjectDocument } from '../../../../classes/docs.class';
import swal from 'sweetalert';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styles: []
})
export class LegacyComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Tipo de documento', 'Estado del documento', 'Fecha', 'Action'];
  dataSource = new MatTableDataSource<ObjectDocument>();
  temporalTable: ObjectDocument[] = [];
  constructor(public dialog: MatDialog, private _fb: DatabaseService, private matSnack: MatSnackBar) {
  }

  ngOnInit() {
    // Ya firebase nos da la información solo debemos mandar un timeout
    // para que refresque el array
    setTimeout(() => {
      this.temporalTable = this._fb.ArrayDocs;
      this.dataSource.data = this.temporalTable;
      this.dataSource._updateChangeSubscription();
    }, 1500);
  }
  popupLegal(legalDoc: ObjectDocument = null, index: number) {
    const modalProfile = this.dialog.open(DocumentsApprovalComponent, {
      width: '1024px',
      height: '600px',
      data: legalDoc
    });

    // Para estar a la escucha de cuando cierre el modal
    modalProfile.afterClosed().subscribe(
      (): void => {
        this.temporalTable = [];
        this.dataSource.data = null;
        setTimeout(() => {
          this.temporalTable = this._fb.ArrayDocs;
          this.dataSource.data = this.temporalTable;
        }, 300);
      }
    );
  }
  deleteDoc(objectDoc: ObjectDocument, index: number) {
    swal({
      title: 'Estás seguro?',
      text: 'Si eliminas este documento, la persona deberá enviarlo nuevamente!',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const deleted = await this._fb.removeElement(objectDoc);
        if (deleted) {
          this.temporalTable.splice(index, 1);
          this.dataSource.data = this.temporalTable;
          this.matSnack.open('Datos actualizados', null, {duration: 3000});
        }
      }
    });
  }
}
