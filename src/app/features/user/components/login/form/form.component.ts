import { Component, model, input, InputSignal, ModelSignal, OutputEmitterRef, output, ChangeDetectorRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from 'stream';
import { LogIn } from '../../../../../core/models/login.entities';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    FontAwesomeModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    NgClass
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  credentials: LogIn = {};

  cargandoLogin: boolean = false;

  enterClicked: OutputEmitterRef<LogIn> = output<LogIn>({});

  faUser: IconDefinition = faUser;
  faLock: IconDefinition = faLock;

  eventObj: any;

  constructor(
    public translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {

  }

  private emitToLogin(): void {
    this.cargandoLogin = true;
    this.enterClicked.emit(this.credentials);
  }

  onButtonClick() {
    if(this.credentials.username && this.credentials.password && !this.cargandoLogin) {
      this.emitToLogin();
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.credentials.username && this.credentials.password && !this.cargandoLogin) {
      this.emitToLogin();
    }
  }
}
