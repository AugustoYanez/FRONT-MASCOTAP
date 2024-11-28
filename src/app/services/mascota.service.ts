import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IMascota } from '../interfaces/Mascota';
import { IMascotaPaginada } from '../interfaces/Paginacion';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private BASEURL = environment.apiUrl;
  private THISURL = `${this.BASEURL}/mascota`;

  constructor(private http: HttpClient) { }

  traerMascotaPagina(pagina:number, limite:number): Observable<IMascotaPaginada> {
    return this.http.get<IMascotaPaginada>(`${this.THISURL}/mascotas/pag/?page=${pagina}&limit=${limite}`);
  }
  eliminarMascota(id: string): Observable<IMascota> {
    return this.http.delete<IMascota>(`${this.THISURL}/mascotas/${id}`);
  }
  traerMascotas(): Observable<IMascota[]> {
    return this.http.get<IMascota[]>(`${this.THISURL}`+ '/mascotas');
  }
  traerMascotasUsuario(): Observable<IMascota[]> {
    return this.http.get<IMascota[]>(`${this.THISURL}`+ '/mascotasUsuario');
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
