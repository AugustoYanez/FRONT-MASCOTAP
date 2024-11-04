import { Component, inject } from '@angular/core';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { Router } from 'express';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  admin: boolean = false;
  auth: AuthService = inject(AuthService);
  private authSubscription: Subscription;
  constructor() {
    this.authSubscription = this.auth.isAdmin$.subscribe(
      (isAdmin) => {
        this.admin = isAdmin;
      }
    )
  }
  

}
