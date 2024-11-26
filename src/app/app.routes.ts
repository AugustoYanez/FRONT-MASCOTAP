import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { PerfilComponent } from './page/perfil/perfil.component';
import { MascotasPerdidasComponent } from './page/mascotas-perdidas/mascotas-perdidas.component';
import { BuscarHogarComponent } from './page/buscar-hogar/buscar-hogar.component';

import { MascotasComponent as mascotaPerfil } from './page/mascotas-perfil/mascotas.component'; // Componente para gestionar mascotas
import { AjustesCuentaComponent } from './page/ajustes-cuenta/ajustes-cuenta.component';
import { AuthGuard } from './auth.guard';
import { AgregarMascotaComponent } from './page/agregar-mascota/agregar-mascota.component';
import { adminGuard } from './admin.guard';
import { CaracteristicasComponent } from './page/caracteristicas/caracteristicas.component';
import { PanelControlComponent } from './page/panel-control/panel-control.component';
import { FormCaracteristicasComponent } from './page/form-caracteristicas/form-caracteristicas.component';
import { SolicitudesComponent } from './page/solicitudes/solicitudes.component';
import { MascotasComponent } from './page/mascotas/mascotas.component';
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
    ],
  },
  {
    path: 'mascotas',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: mascotaPerfil },
      { path: 'agg-mascota', component: AgregarMascotaComponent },
    ],
  },
  {
    path: 'encontrar',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MascotasComponent }, // Lista de mascotas perdidas
      { path: 'buscar-hogar', component: BuscarHogarComponent }, // Buscar hogares de tránsito
    ],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'panel-control', component: PanelControlComponent },
      { path: 'caracteristicas', component: CaracteristicasComponent },
      {path: 'form-caracteristicas', component: FormCaracteristicasComponent},
      { path: 'solicitudes', component: SolicitudesComponent }
    ]
  }
];
