import { afterRender, Injectable } from '@angular/core';
import { User } from '../models/user.entities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimingService } from './timing.service';
import { environment } from '../../../environments/environment';
import { LogIn } from '../models/login.entities';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ApiMessage } from '../models/apimessage.entities';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase: string;
  httpOptions: any;

  private isAuthenticated: boolean = false;
  private timeoutId: number | null | NodeJS.Timeout = null;

  public userData?: User;
  
  constructor(
    private http: HttpClient,
    private time: TimingService,
    private router: Router
  ) {
    this.urlBase = environment.API_URL + 'Usuarios/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true'
      }),
      responseType: 'json'
    };
    // afterRender(() => {
    //   this.isAuthenticated = sessionStorage.getItem('authenticated') === 'true' ? true : false;
    // });
  }

  private authenticate(userObj: LogIn): Observable<any> {
    const apiUrl = this.urlBase + 'Autenticar?' + 'username=' + userObj.username + '&password=' + userObj.password;
    return this.http.get<any>(apiUrl, this.httpOptions);
  }

  private startTimeout(): void {
    this.timeoutId = setTimeout(() => {
      this.logout(); // Cerrar la sesión automáticamente después de 15 minutos de inactividad.
    }, 15 * 60 * 1000); // 15 minutos en milisegundos
  }

  private resetTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.startTimeout();
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    // afterRender(() => {
    //   sessionStorage.removeItem('user')
    //   sessionStorage.setItem('authenticated', 'false');
    // });
  }
  
  async login(userObj: LogIn): Promise<ApiMessage> {
    this.time.start();
    let response: ApiMessage;
    
    try {
      response = await firstValueFrom(this.authenticate(userObj));
      if(response.error) {
        this.startTimeout();
      }
      else {
        if(typeof response.mensaje === 'object') {
          this.userData = response.mensaje;
          console.log(this.userData);
        }
        this.isAuthenticated = true;
        this.resetTimeout();
      }
    }
    catch(error) {
      this.startTimeout();
      response = {
        mensaje: 'Ocurrió un error durante el inicio de sesión.',
        error: true
      } as ApiMessage;
    }
    
    this.time.end();
    return response;
  }

  logout(): void {
    // Lógica para cerrar la sesión y establecer isAuthenticated en false
    this.isAuthenticated = false;
    this.userData = undefined;
    this.router.navigate(['/login']);
    this.clearTimeout();
  }

  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }
}