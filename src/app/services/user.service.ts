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

  eliminarMascota(id: string): Observable<IMascota> {
    return this.http.delete<IMascota>(`${this.THISURL}/mascotas/${id}`);
  }
  
  traerMascotas(): Observable<IMascota[]> {
    return this.http.get<IMascota[]>(`${this.THISURL}`+ '/mascotas');
  }
  
  agregarMascota(mascota: IMascota): Observable<IMascota> {
    return this.http.post<IMascota>(`${this.THISURL}`+ '/mascotas', mascota);
  }
  editarMascota(mascota: IMascota): Observable<IMascota> {
    return this.http.put<IMascota>(`${this.THISURL}`+ '/mascotas', mascota)
  }

  traerMascotasPerdidas(): Observable<IMascota[]> {
    return this.http.get<IMascota[]>(`${this.THISURL}/mascotas-perdidas`);
  }

  
}
