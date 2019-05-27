import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SyfteInboxClass } from '../../../classes/mail/inbox.class';
import { MailService } from '../../../services/mail/mail.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
    inbox: SyfteInboxClass;
  constructor(private ref: MatDialogRef<LoaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SyfteInboxClass,
    private _mail: MailService) {
      this.inbox = this.data;
      console.log(this.inbox);
    }

  async ngOnInit() {
    const msg: Boolean = await this.SendMessage();
    if (msg) {
      this.ref.close(true);
    } else {
      this.ref.close(false);
    }
  }
  // Función que se encarga de enviar el mensaje
  SendMessage(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this._mail.MsgAutomation(this.EmailType(Number(this.inbox.emaiLType)), this.inbox)
          .subscribe((mailer): void => {
            if (mailer.status) {
              resolve(true);
            } else {
              resolve(false);
            }
          }, () => reject(false));
    });
  }
  // Evaluamos el tipo de email que solicitamos enviar
  EmailType(msg: number): string {
    switch (msg) {
      case 1: // normal
        return 'normal';
      case 2:
        return 'branding';
      case 3:
        return 'marketing';
      case 4:
        return 'app';
      case 5:
        return 'ecommerce';
      case 6:
        return 'web';
      default:
        return 'normal';
    }
  }
}
