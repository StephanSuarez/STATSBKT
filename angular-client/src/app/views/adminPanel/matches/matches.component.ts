import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  match = {
    id: '',
    date: '',
    jugadorId: '',
    dosPuntosExitosos: '',
    dosPuntosFallidos: '',
    tresPuntosExitosos: '',
    tresPuntosFallidos: '',
    tirolibreExitosos: '',
    tirolibreFallidos: '',
    rebotes: '',
    asistencias: '',
    minutosJugados: '',
    equipoAId: '',
    equipoBId: ''
  };

  onSubmit() {
    console.log('Formulario enviado:', this.match);
  }
}
