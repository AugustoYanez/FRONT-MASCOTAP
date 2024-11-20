import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Rol } from './interfaces/enums';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  admin: boolean = false;
  auth: AuthService = inject(AuthService);
  private authSubscription: Subscription;  
  constructor() {
    this.authSubscription = this.auth.isAdmin$.subscribe(
      (isAdmin) => {
        this.admin = isAdmin == Rol.Administrador;
      }
    ) 
  }
  ngOnInit(){
    this.auth.isAdmin() 
  }

  

}
