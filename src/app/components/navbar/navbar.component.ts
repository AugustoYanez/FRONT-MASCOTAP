import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logueado = false;
  auth: AuthService = inject(AuthService);

  constructor( private router: Router) {

   }
   ngOnInit() {
     this.auth.isAdmin().then((isAdmin) => {
      this.logueado = isAdmin
     });
   }
}
