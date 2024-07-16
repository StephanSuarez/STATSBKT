import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent {

  player: any = { id:"1", number: 7, fondo: 'assets/imgs/escudos/fondoU.png', image: 'assets/imgs/avatars/men/avatar1.png', imgEscudo: "assets/imgs/escudos/ucundinamarca.png", name: 'John', team: 'Ucundinamarca', rebotes: 7, asistencias: 8, puntos: 25 };
  
}