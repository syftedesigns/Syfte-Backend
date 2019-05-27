import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { AffiliationClass } from '../../../classes/affiliation.class';
import { NgForm } from '@angular/forms';
import { SyfteInboxClass } from '../../../classes/mail/inbox.class';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-send-marketing',
  templateUrl: './send-marketing.component.html',
  styleUrls: ['./send-marketing.component.css']
})
export class SendMarketingComponent implements OnInit {
  public Customer: AffiliationClass;
  filename: string = '';
  Attachment: File = null;
  displayEditor: boolean = false;
  constructor(private Ref: MatDialogRef<SendMarketingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AffiliationClass,
    private matSnack: MatSnackBar, private dialog: MatDialog) {
      this.Customer = this.data;
    }

  ngOnInit() {
  }
  // Enviar emails personalizado a un cliente especifico
  sendToInbox(mail: NgForm): void {
    if (mail.invalid) {
      throw new Error('Formulario inválido');
    }
    const InboxMessage: SyfteInboxClass = new SyfteInboxClass(mail.value.client_email,
      mail.value.client_name, this.Customer.client_service,
      mail.value.subject, mail.value.message, mail.value.emailType, this.Attachment);
      // Enviamos el formulario a la API de PHP que se encargará de los emails
      const inboxEmitEvent = this.dialog.open(LoaderComponent, {
        disableClose: true,
        data: InboxMessage
      });
      inboxEmitEvent.afterClosed()
        .subscribe((e: boolean): void => {
          if (e) {
            this.matSnack.open('Email enviado con éxito', null, {
              duration: 4000,
              panelClass: ['success-snackbar']
            });
            this.Ref.close();
          } else {
            this.matSnack.open('No pudo enviar el correo, inténtalo nuevamente', null, {
              duration: 4000,
              panelClass: ['red-snackbar']
            });
            this.Ref.close();
          }
        });
  }
  FileValue(file: File): void {
    // Verificamos la extensión
    if (file.type === 'image/jpeg' || file.type === 'image/png'
    || file.type === 'image/jpg' || file.type === 'image/gif'
    || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    || file.type === 'application/pdf'
    || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const reader = new FileReader();
      reader.onload = (e: any): void => {
        this.filename = file.name;
        this.Attachment = file;
      };
      reader.readAsDataURL(file);
    } else {
      this.matSnack.open('Tipo de archivo inválido, formato permitido: jpg, jpeg, png, gif, xls, pptx, pdf', null, {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      this.filename = '';
      this.Attachment = null;
      return;
    }
  }
  DisplayEditor() {
    if (this.displayEditor) {
      this.displayEditor = false;
    } else {
      this.displayEditor = true;
    }
  }
}
