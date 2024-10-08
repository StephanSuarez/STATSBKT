import { HttpClient } from '@angular/common/http';
import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  idJugador: string = '';
  categories: string[] = ["Zonal", "Nacional"];
  minutosjug: number = 0;
  segundosJugados: number = 0;
  resultGrame: string = ""
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
    equipoBId: '',
    victoria: false
  };

  successMessage: string | null = null;


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const jugadoresUrl = `${this.baseUrl}/usuarios`;
    const equiposUrl = `${this.baseUrl}/equipos`;
    const juegosUrl = `${this.baseUrl}/estadisticas/${this.idJugador}`
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
    this.match.victoria = this.resultGrame == "victoria" ? true : false;

    this.enviarDatos(this.match);
    this.limpiarFormulario()
  }

  enviarDatos(data: any) {
    this.http.post(`${this.baseUrl}/juegos`, data).subscribe(
      (res) => {
        this.successMessage = 'Jugador añadido correctamente';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
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
      equipoBId: '',
      victoria: false
    };
    this.minutosjug = 0;
    this.segundosJugados = 0;
    this.successMessage = null;
  }

  private baseUrl = environment.apiBaseUrl;
}
