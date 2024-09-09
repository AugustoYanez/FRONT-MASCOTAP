import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      if (this.authService.loggedIn("token")) 
      {
        if (await this.authService.isAdmin()) {
          return true;
        }
      }
      this.authService.setRedirectUrl(state.url); // Almacena la URL solicitada
      this.router.navigate(['/']);
      return false;
  }
}