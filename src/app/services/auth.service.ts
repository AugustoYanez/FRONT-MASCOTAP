import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsuario } from '../interfaces/Usuario';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { Rol } from '../interfaces/enums';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storage: StorageService = inject(StorageService);
  user: UserService = inject(UserService);
  private BASEURL = environment.apiUrl;
  private THISURL = `${this.BASEURL}/api`;
  private redirectUrl: string | null = null;

  // Observable para el estado de admin
  private isAdminSubject = new BehaviorSubject<string | null>(null);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
  limpiarLogs(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    }
  }

  register(user: IUsuario): Observable<any> {
    return this.http.post<IUsuario>(`${this.THISURL}` + '/register', user);
  }

  login(user: IUsuario): Observable<any> {
    return this.http.post<IUsuario>(`${this.THISURL}` + '/login', user);
  }

  getToken(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return this.storage.getItem(key);
    }
    return null;
  }

  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        this.user.perfil().subscribe({
          next: (res) => {
            console.log(res);
            this.storage.setItem("rol", res.rol)
            this.isAdminSubject.next(res.rol)
          },
          error: () => {
            this.storage.removeItem("rol")
            this.isAdminSubject.next(null);
          }
        });
      }
    });
  }

  loggedIn(key: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!this.storage.getItem(key);
    }
    return false;
  }

  logout() {
    this.storage.clear();
    this.isAdminSubject.next(null);
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }
}
