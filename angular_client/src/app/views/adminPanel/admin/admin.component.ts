import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent { 

  constructor(private router: Router) {}

  irAdJugadores(){ this.router.navigate(['/admin-jugadores']) }
  irAdEquipos(){ this.router.navigate(['/admin-equipos']) }
  irAdJuegos(){ this.router.navigate(['/admin-juegos']) }
}
