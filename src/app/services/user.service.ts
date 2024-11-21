import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/Usuario';
import { IMascota } from '../interfaces/Mascota';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private BASEURL = environment.apiUrl;
  private THISURL = `${this.BASEURL}/user`;

  constructor(private http: HttpClient) { }

  perfil(): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.THISURL}`+ '/perfil');
  }
  
}
