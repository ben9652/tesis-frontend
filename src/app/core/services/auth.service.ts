import { Injectable } from '@angular/core';
import { User } from '../models/user.entities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimingService } from './timing.service';
import { Router } from 'express';
import { environment } from '../../../environments/environment';
import { LogIn } from '../models/login.entities';
import { Observable } from 'rxjs';
import { ApiMessage } from '../models/apimessage.entities';

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
    this.isAuthenticated = sessionStorage.getItem('authenticated') === 'true' ? true : false;
    this.userData = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  // login(userObj: LogIn): Observable<ApiMessage> {
    
  // }
}
