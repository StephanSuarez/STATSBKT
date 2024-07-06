import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent {

  player: any = { id:"1", number: 7, image: 'assets/imgs/danielmora.png', name: 'John Doe', team: 'Ucundinamarca', rebotes: 7, asistencias: 8, puntos: 25 };
  
}
