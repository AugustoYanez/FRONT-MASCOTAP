import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICaracteristicas } from '../interfaces/Caracteristica';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {
  private BASEURL = environment.apiUrl;
  private THISURL = `${this.BASEURL}/admin`;
  constructor(private http: HttpClient) { }

  getCaracteristicas(): Observable<ICaracteristicas[]> {
    return this.http.get<ICaracteristicas[]>(`${this.THISURL}` + "/caracteristicas");
  }

  addCaracteristica(caracteristica:ICaracteristicas):Observable<ICaracteristicas>{
    return this.http.post<ICaracteristicas>(`${this.THISURL}` + "/caracteristicas", caracteristica)
  }
}
