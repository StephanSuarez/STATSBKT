import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent {

  private apiUrl: string = environment.apiBaseUrl;

  jugadorId: string = "";
  jugador: any;
  equipoJugador: any;
  estadisticasJugador: any;
  datosPromeio = {
    puntos: 0,
    asistencias: 0,
    rebotes: 0,
    minutosJugados: 0
  }

  constructor(private router: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.jugadorId = params['id'];
      this.ObtenerJugador(this.jugadorId).pipe(
        switchMap(jugador => {
          this.jugador = jugador;
          return this.obtenerEquipoJugador(jugador.equipoId);
        }),
        switchMap(equipoJugador => {
          this.equipoJugador = equipoJugador;
          return this.obtenerEstadisticasJugador(this.jugadorId);
        })
      ).subscribe(
        (estadisticasJugador) => {
          this.estadisticasJugador = estadisticasJugador;
          console.log(this.jugador, this.equipoJugador, this.estadisticasJugador);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  ObtenerJugador(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  obtenerEquipoJugador(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/equipos/${id}`);
  }

  obtenerEstadisticasJugador(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/juegos/estadisticas/${id}`);
  }

  player: any = {
    id: "1",
    number: 7,
    fondo: 'assets/imgs/escudos/fondoU.png',
    image: 'assets/imgs/avatars/men/avatar1.png',
    imgEscudo: "assets/imgs/escudos/ucundinamarca.png",
    name: 'John',
    team: 'Ucundinamarca',
    rebotes: 7,
    asistencias: 8,
    puntos: 25
  };

}
