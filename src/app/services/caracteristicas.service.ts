import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICaracteristicas } from '../interfaces/Caracteristica';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IMascota } from '../interfaces/Mascota';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {
  private BASEURL = environment.apiUrl;
  private THISURL = `${this.BASEURL}/admin`;
  
  private caracteristicasSubject = new BehaviorSubject<ICaracteristicas[] | null>(null);
  caracteristicas$ = this.caracteristicasSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadCaracteristicas(): Observable<ICaracteristicas[]> {
    if (!this.caracteristicasSubject.value && typeof window !== 'undefined' && window.localStorage) {
      return this.getCaracteristicas().pipe(
        tap((caracteristicas) => this.caracteristicasSubject.next(caracteristicas))
      );
    }
    return this.caracteristicas$ as Observable<ICaracteristicas[]>;
  }

  getCaracteristicas(): Observable<ICaracteristicas[]> {
    return this.http.get<ICaracteristicas[]>(`${this.THISURL}` + "/caracteristicas");
  }

  getData(): Observable<ICaracteristicas[]> {
    return this.caracteristicas$ as Observable<ICaracteristicas[]>;
  }

  addCaracteristica(caracteristica: ICaracteristicas): Observable<ICaracteristicas> {
    return this.http.post<ICaracteristicas>(`${this.THISURL}/caracteristicas`, caracteristica).pipe(
      tap((nuevaCaracteristica) => {
        const currentCaracteristicas = this.caracteristicasSubject.value || [];
        this.caracteristicasSubject.next([...currentCaracteristicas, nuevaCaracteristica]);
      })
    );
  }
  
  clearCache() {
    this.caracteristicasSubject.next(null);
  }

  actualizarSolicitud(mascota: IMascota): Observable<IMascota> {
    return this.http.put<IMascota>(`${this.THISURL}/editarSolicitudMascota`,mascota)
  }

}
