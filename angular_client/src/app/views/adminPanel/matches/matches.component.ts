import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  constructor(private route: Router, private http: HttpClient) {}

  jugadores: any
  equipos: any
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


  private baseUrl = 'http://localhost:3000';

  ngOnInit() {
    const jugadoresUrl = `${this.baseUrl}/usuarios`;
    const equiposUrl = `${this.baseUrl}/equipos`;
    this.obtenerJugadores(jugadoresUrl);
    this.obtenerEquipos(equiposUrl);
  }

  obtenerJugadores(url: string) {
    this.http.get(url).subscribe(
      (res) => {
        this.jugadores = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerEquipos(url: string) {
    this.http.get(url).subscribe(
      (data: any) => {
        this.equipos = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
