import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/auth/login/login.component';
import { EquiposComponent } from './views/equipos/equipos.component';
import { EstadisticasComponent } from './views/estadisticas/estadisticas.component';
import { LideresComponent } from './views/lideres/lideres.component';
import { EquipoComponent } from './views/equipo/equipo.component';
import { JugadorComponent } from './views/jugador/jugador.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'lideres', component: LideresComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'jugador', component: JugadorComponent}
];
