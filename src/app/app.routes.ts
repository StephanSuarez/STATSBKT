import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home/home.component';
import { TeamComponent } from './views/teams/team/team.component';
import { LoginComponent } from './views/auth/login/login.component';
import { EquiposComponente } from './views/equipos/equipos.component';
import { EstadisticasComponent } from './views/estadisticas/estadisticas.component';
import { LideresComponent } from './views/lideres/lideres.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'team', component: TeamComponent},
  { path: 'login', component: LoginComponent },
  { path: 'equipos', component: EquiposComponente},
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'lideres', component: LideresComponent }

];
