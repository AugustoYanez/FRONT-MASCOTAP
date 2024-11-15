import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IMascota } from '../interfaces/Mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private BASEURL = environment.apiUrl;
  private THISURL = `${this.BASEURL}/mascota`;

  constructor(private http: HttpClient) { }

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
}
