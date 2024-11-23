import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { PerfilComponent } from './page/perfil/perfil.component';
import { MascotasComponent } from './page/mascotas/mascotas.component';
import { AjustesCuentaComponent } from './components/ajustes-cuenta/ajustes-cuenta.component';
import { AuthGuard } from './auth.guard';
import { AgregarMascotaComponent } from './page/agregar-mascota/agregar-mascota.component';
import { MascotasPerdidasComponent } from './page/mascotas-perdidas/mascotas-perdidas.component';
import { BuscarHogarComponent } from './page/buscar-hogar/buscar-hogar.component';
import { NotificarMascotaComponent } from './page/notificar-mascota/notificar-mascota.component';
import { PublicacionDetalleComponent } from './page/publicacion-detalle/publicacion-detalle.component';

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
    path: 'mascotas-perdidas',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MascotasPerdidasComponent }, // Lista de mascotas perdidas
      { path: 'buscar-hogar', component: BuscarHogarComponent }, // Buscar hogares de tránsito
      { path: 'notificar-encontrada', component: NotificarMascotaComponent }, // Notificar mascota encontrada
      { path: ':id', component: PublicacionDetalleComponent }, // Ver detalles de una mascota perdida
    ],
  },
];
