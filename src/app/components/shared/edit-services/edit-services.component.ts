import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ObjectService } from '../../../classes/services.class';
import { ClientServicesService } from '../../../services/api/client-services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {
  public updatingSrv: boolean = false;
  public SrvName: string = '';
  srv_id: number = 0;
  constructor(public dialogRef: MatDialogRef<EditServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObjectService, private _srv: ClientServicesService) {
      if (data) {
        this.updatingSrv = true;
        this.SrvName = data.srv_name;
        this.srv_id = data.srv_id;
      } else {
        return;
      }
    }

  ngOnInit() {
  }
  createNewService(formValue: NgForm): void {
    if (formValue.invalid) {
      throw new Error('Formulario inválido');
    }
    const newInserction: ObjectService = new ObjectService(formValue.value.SRV_NAME, formValue.value.srv_id);
    if (this.updatingSrv) {
      this._srv.insertOrUpdateRole('updateService', newInserction, newInserction.srv_id)
        .subscribe((rol: any) => {
          if (rol.status) {
            const returningData = {
              updating: true,
              data: newInserction
            };
            this.dialogRef.close(returningData);
          }
        });
    } else {
      this._srv.insertOrUpdateRole('createService', newInserction).subscribe(
        (observer: any) => {
          if (observer.status) {
            const returningData = {
              updating: false,
              data: new ObjectService(newInserction.srv_name, observer.data)
            };
            this.dialogRef.close(returningData);
          }
        }
      );
    }
  }
}
