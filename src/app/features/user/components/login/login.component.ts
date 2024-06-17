import { afterRender, Component, signal, WritableSignal } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { FormComponent } from './form/form.component';
import { ToastModule } from 'primeng/toast';
import { LogIn } from '../../../../core/models/login.entities';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorUtil } from '../../../../core/utils/device-detector.util';
import { MessageService } from 'primeng/api';
import { User } from '../../../../core/models/user.entities';
import { ApiMessage } from '../../../../core/models/apimessage.entities';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BannerComponent,
    FormComponent,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  userData?: User;
  protected isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {

  }
  
  ngOnInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // afterRender(() => {
    //   sessionStorage.removeItem('userID');
    //   sessionStorage.removeItem('role');
    //   sessionStorage.setItem('authenticated', 'false');
    // });
  }

  login(credentials: LogIn) {
    this.authService.login(credentials).then((res: ApiMessage) => {
      if(!res.error) {
        this.router.navigate(['sections']);
        this.userData = this.authService.userData;
        // afterRender(() => {
        //   sessionStorage.setItem('userID', JSON.stringify(this.userData?.id_user));
        //   sessionStorage.setItem('authenticated', 'true');
        // });
      }
      else {
        if(typeof res.mensaje === 'string') {
          this.messageService.add({
            severity: 'error',
            summary: 'Inicio de sesión fallido',
            detail: res.mensaje
          });
        }
      }

      this.isLoading.set(false);
    });
  }
}
