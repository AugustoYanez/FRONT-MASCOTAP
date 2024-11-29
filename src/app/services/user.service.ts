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

  constructor(private http: HttpClient, private router: Router) { }

  perfil(): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.THISURL}`+ '/perfil');
  }
  contactarUsuario(id:string){
    this.router.navigate(['/perfil-v2', id]);
  } 

  getPerfil(id:string): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.THISURL}`+ '/perfil'+ `/${id}`);
  }
  
}
