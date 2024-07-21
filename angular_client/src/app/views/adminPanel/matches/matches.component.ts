import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  jugadores: any;
  equipos: any;
  categories: string[] = ["Zonal", "Nacional"];
  minutosjug: number = 0;
  segundosJugados: number = 0;
  match = {
    category: '',
    date: '',
    jugadorId: '',
    dosPuntosE: '',
    dosPuntosF: '',
    tresPuntosE: '',
    tresPuntosF: '',
    tirolibreE: '',
    tirolibreF: '',
    rebotes: '',
    asistencias: '',
    minutosjug: [""],
    equipoAId: '',
    equipoBId: ''
  };

  successMessage: string | null = null;


  constructor(private route: Router, private http: HttpClient) {}

  ngOnInit() {
    const jugadoresUrl = `${this.baseUrl}/usuarios`;
    const equiposUrl = `${this.baseUrl}/equipos`;
    this.obtenerJugadores(jugadoresUrl);
    this.obtenerEquipos(equiposUrl);
    console.log("------")
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
        console.log(this.equipos);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.match.minutosjug = [this.minutosjug.toString(), this.segundosJugados.toString()];
    this.enviarDatos(this.match);
    this.successMessage = "Juego registrado correctamente"
    this.limpiarFormulario()
  }

  enviarDatos(data: any) {
    this.http.post(`${this.baseUrl}/juegos`, data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  limpiarFormulario() {
    this.match = {
      category: '',
      date: '',
      jugadorId: '',
      dosPuntosE: '',
      dosPuntosF: '',
      tresPuntosE: '',
      tresPuntosF: '',
      tirolibreE: '',
      tirolibreF: '',
      rebotes: '',
      asistencias: '',
      minutosjug: [""],
      equipoAId: '',
      equipoBId: ''
    };
    this.minutosjug = 0;
    this.segundosJugados = 0;
    this.successMessage = null;
  }

  private baseUrl = environment.apiBaseUrl;
}
