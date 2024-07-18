import { afterRender, AfterRenderPhase, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MainBannerComponent } from '../../sections/main-section/main-banner/main-banner.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { EditProfileService } from './edit-profile.service';
import { User } from '../../../core/models/user.entities';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PatchObject } from '../../../core/models/patchObj.entities';
import { ApiMessage } from '../../../core/models/apimessage.entities';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    TranslateModule,
    MainBannerComponent,
    ToastModule,
    CommonModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  providers: [MessageService]
})
export class EditProfileComponent {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmedPassword?: string;

  userData?: User;

  isLoading: boolean = false;

  constructor(
    public translateService: TranslateService,
    public editProfileService: EditProfileService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    
  }
  
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.userData = this.authService.getUser();
  }

  private updateAttributes(attributesToChange: PatchObject[]): Observable<boolean> {
    if(this.userData) {
      return this.editProfileService.updateUser(this.userData.id_user, attributesToChange).pipe(
        map((response) => {
          let res: ApiMessage = response.body;
          if(res.error) {
            this.messageService.add({
              severity: 'error',
              // TODO: Agregar al translate estos mensajes y hacer uso de ellos
              summary: 'Error en los cambios',
              detail: res.mensaje
            });
            return false;
          }
          this.userData = res.mensaje;
          this.editProfileService.setUser(res.mensaje);
          this.messageService.add({
            severity: 'success',
            // TODO: Agregar al translate estos mensajes y hacer uso de ellos
            summary: 'Éxito',
            detail: '¡Cambios realizados!'
          });

          this.username = '';
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmedPassword = '';
          
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            // TODO: Agregar al translate estos mensajes y hacer uso de ellos
            summary: 'Denegado',
            detail: 'No estás autorizado a realizar esta acción'
          });

          this.username = '';
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmedPassword = '';

          return of(false);
        })
      );
    }
    else {
      return of(false);
    }
  }

  updateChanges() {
    this.isLoading = true;
    let attributesToChange: PatchObject[] = [];
    if(this.username) {
      if(this.username === this.userData?.username) {
        this.isLoading = false;
        return;
      }
      attributesToChange.push(
        new PatchObject('replace', 'username', this.username)
      );
    }
    if(this.currentPassword || this.newPassword || this.confirmedPassword) {
      if(this.currentPassword && this.newPassword && this.confirmedPassword) {
        if(this.newPassword !== this.confirmedPassword) {
          this.messageService.add({
            severity: 'warn',
            // TODO: Agregar al translate estos mensajes y hacer uso de ellos
            summary: 'Campos inválidos',
            detail: 'Las contraseñas no coinciden'
          });
          this.isLoading = false;
          return;
        }
        else {
          attributesToChange.push(
            new PatchObject('replace', 'password', this.newPassword)
          );
        }
      }
      else {
        this.isLoading = false;
        return;
      }
    }

    if(!this.username && !this.currentPassword && !this.newPassword && !this.confirmedPassword) {
      this.messageService.add({
        severity: 'warn',
        // TODO: Agregar al translate estos mensajes y hacer uso de ellos
        summary: 'Campos inválidos',
        detail: 'No se llenaron los campos'
      });
      this.isLoading = false;
    }
    else {
      if(this.userData) {
        if(this.username && this.currentPassword && this.newPassword || this.currentPassword && this.newPassword) {
          this.editProfileService.checkPassword(this.userData.id_user, this.currentPassword).subscribe((isActualPassword: boolean) => {
            if(!isActualPassword) {
              this.messageService.add({
                severity: 'error',
                // TODO: Agregar al translate estos mensajes y hacer uso de ellos
                summary: 'Campos inválidos',
                detail: 'Contraseña incorrecta'
              });

              this.isLoading = false;
            }
            else {
              this.updateAttributes(attributesToChange).subscribe((failed: boolean) => {
                this.isLoading = false;
              });
            }
          });
        }
        else if(this.username) {
          this.updateAttributes(attributesToChange).subscribe((failed: boolean) => {
            this.isLoading = false;
          });
        }
      }
    }
  }
}
