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
  providedIn: 'root'
})
export class AuthService {

  storage : StorageService = inject(StorageService)
  user: UserService = inject(UserService);
  private BASEURL = environment.apiUrl;
  private THISURL = `${this.BASEURL}/api`;
  private redirectUrl: string | null = null;
  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: IUsuario): Observable<any> {
    return this.http.post<IUsuario>(`${this.THISURL}` + '/register', user);
  }

  login(user: IUsuario): Observable<any> {
    return this.http.post<IUsuario>(`${this.THISURL}` + '/login', user);
  }

  getToken(key: string): string | null {
    
    if (typeof window !== 'undefined' && window.localStorage) {
      return this.storage.getItem(key)
    }
    return null;
  }

  isAdmin(): Promise<boolean> {
    return new Promise((resolve,reject)=> {

      this.user.perfil().subscribe({
      next: (res) => {
        if (res.rol == Rol.Administrador) {
          resolve(true);
        }
        reject(false);
      }
    })
    });
  }

  loggedIn(key: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!this.storage.getItem(key)
    }
    return false;
  }

  logout() {
    this.storage.clear()
    this.router.navigate(['/']);
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
