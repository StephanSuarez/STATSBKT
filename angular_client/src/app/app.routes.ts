import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/auth/login/login.component';
import { EquiposComponent } from './views/equipos/equipos.component';
import { LideresComponent } from './views/lideres/lideres.component';
import { EquipoComponent } from './views/equipo/equipo.component';
import { JugadorComponent } from './views/jugador/jugador.component';
import { AdminComponent } from './views/adminPanel/admin/admin.component';
import { MatchesComponent } from './views/adminPanel/matches/matches.component';
import { PlayersComponent } from './views/adminPanel/players/players.component';
import { TeamsComponent } from './views/adminPanel/teams/teams.component';
import { AuthGuard } from './auth/admin.guard';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lideres', component: LideresComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'jugador', component: JugadorComponent},

  // ADMIN
  { path: 'admin-panel', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'admin-jugadores', component: PlayersComponent, canActivate: [AuthGuard]},
  { path: 'admin-equipos', component: TeamsComponent, canActivate: [AuthGuard]},
  { path: 'admin-juegos', component: MatchesComponent, canActivate: [AuthGuard]},

  // NOT FOUND
  { path: '**', component: NotFoundComponent }
];
