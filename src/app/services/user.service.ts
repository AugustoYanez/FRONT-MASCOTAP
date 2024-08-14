import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/Usuario';
import { IMascota } from '../interfaces/Mascota';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private URL = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router) { }

  perfil(): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.URL}`+ '/perfil');
  }

  eliminarMascota(id: string): Observable<IMascota> {
    return this.http.delete<IMascota>(`${this.URL}/mascotas/${id}`);
  }
  
  traerMascotas(): Observable<IMascota[]> {
    return this.http.get<IMascota[]>(`${this.URL}`+ '/mascotas');
  }
  
  agregarMascota(mascota: IMascota): Observable<IMascota> {
    return this.http.post<IMascota>(`${this.URL}`+ '/mascotas', mascota);
  }
  editarMascota(mascota: IMascota): Observable<IMascota> {
    return this.http.put<IMascota>(`${this.URL}`+ '/mascotas', mascota)
  }



  
}
