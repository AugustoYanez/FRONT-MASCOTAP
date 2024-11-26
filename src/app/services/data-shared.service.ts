import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMascota } from '../interfaces/Mascota';
import { Estado, Solicitud } from '../interfaces/enums';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  default: IMascota = {
    _id: '',
    placaID: '',
    nombre: '',
    apodo: '',
    edad: 0,
    descripcion: '',
    imagen: '',
    caracteristicas: '',
    estado: Estado.Encontrada,
    ubicacion: '',
    solicitud: Solicitud.aceptado
  };

  private dataSources: { [id: string]: BehaviorSubject<IMascota> } = {};
  private mascotasList: BehaviorSubject<IMascota[]> = new BehaviorSubject<IMascota[]>([]);

  getData(id: string): Observable<IMascota> {
    if (!this.dataSources[id]) {
      this.dataSources[id] = new BehaviorSubject<IMascota>(this.default);
    }
    return this.dataSources[id].asObservable();
  }

  getAllData(): Observable<IMascota[]> {
    return this.mascotasList.asObservable();
  }

  changeData(id: string, data: IMascota) {
    if (!this.dataSources[id]) {
      this.dataSources[id] = new BehaviorSubject<IMascota>(this.default);
    }
    this.dataSources[id].next(data);
    this.updateMascotasList();
  }

  removeData(id: string) {
    if (this.dataSources[id]) {
      delete this.dataSources[id];
      this.updateMascotasList();
    }
  }

  private updateMascotasList() {
    const allData = Object.values(this.dataSources).map(subject => subject.getValue());
    this.mascotasList.next(allData);
  }

  clear() {
    this.dataSources = {}; // Corregido: reinicia dataSources
    this.mascotasList.next([]); // Reinicia la lista de mascotas
  }
}
