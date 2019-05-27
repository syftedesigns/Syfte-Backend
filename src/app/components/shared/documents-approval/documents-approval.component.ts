import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ObjectDocument } from '../../../classes/docs.class';
import { DatabaseService } from '../../../services/firebase/database.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-documents-approval',
  templateUrl: './documents-approval.component.html',
  styleUrls: ['./documents-approval.component.css']
})
export class DocumentsApprovalComponent implements OnInit {
  public ObjectClient: ObjectDocument;
  constructor(public dialogRef: MatDialogRef<DocumentsApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObjectDocument, private _fb: DatabaseService,
    private matSnack: MatSnackBar) {
      if (data) {
        this.ObjectClient = data;
      }
    }

  ngOnInit() {
  }
  async ValidateDoc(form: NgForm) {
    if (form.invalid) {
      throw new Error('El formulario es inválido');
    }
    switch (form.value.estado) {
      case 'habilitado':
      this.ObjectClient.estado = true;
      break;
      case 'rechazado':
      this.ObjectClient.estado = false;
      break;
    }
    this.ObjectClient.client_id = 1;
    const updating = await this._fb.updateElement(this.ObjectClient);
    if (updating) {
      this.dialogRef.close();
      this.matSnack.open('Documento actualizado', null, {duration: 3000});
    }
  }
}
