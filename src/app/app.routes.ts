import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { PerfilComponent } from './page/perfil/perfil.component';
import { MascotasComponent } from './page/mascotas/mascotas.component'; // Componente para gestionar mascotas
import { AjustesCuentaComponent } from './components/ajustes-cuenta/ajustes-cuenta.component';
import { AuthGuard } from './auth.guard';
import { AgregarMascotaComponent } from './page/agregar-mascota/agregar-mascota.component';
import { adminGuard } from './admin.guard';
import { CaracteristicasComponent } from './page/caracteristicas/caracteristicas.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'perfil', component: PerfilComponent },
      { path: 'ajustes-cuenta', component: AjustesCuentaComponent },
      { path: 'agg-mascota', component: AgregarMascotaComponent },
    ],
  },
  {
    path: 'mascotas',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MascotasComponent },
      { path: 'agg-mascota', component: AgregarMascotaComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'caracteristicas', component: CaracteristicasComponent }
    ]
  }
];
