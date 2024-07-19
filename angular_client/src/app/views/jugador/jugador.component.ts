import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, withXsrfConfiguration } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent {

  private apiUrl: string = environment.apiBaseUrl;

  jugadorId: string = "";
  jugador: any;
  equipoJugador: any;
  estadisticasJugador: any;
  datosPromedio = {
    puntos: 0,
    asistencias: 0,
    rebotes: 0,
    minutosJugados: 0
  }
  juegosDatos = [

  ]

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
          this.calcularDatosPromedio(estadisticasJugador);
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

  calcularDatosPromedio(juegos: any[]) {
    // PUNTOS
    const totalPuntos = juegos.reduce((acumulador, juego) => {
      const puntos = (juego.dosPuntosE * 2 + juego.tresPuntosE * 3 + juego.tirolibreE);
      return acumulador + puntos;
    }, 0);
    const promedioPuntos = totalPuntos / juegos.length;
    this.datosPromedio.puntos = promedioPuntos;

    // ASISTENCIAS
    const totalAsistencias = juegos.reduce((acumulador, juego) =>{
      const asistencias = juego.asistencias;
      return acumulador + asistencias;
    }, 0);
    const promedioAsistencias = totalAsistencias / juegos.length;
    this.datosPromedio.asistencias = promedioAsistencias

    // REBOTES
    const totalRebotes = juegos.reduce((acumulador, juego)=>{
      const rebotes = juego.rebotes;
      return acumulador + rebotes; 
    }, 0);
    const promedioRebotes = totalRebotes / juegos.length;
    this.datosPromedio.rebotes = promedioRebotes;

    // MINUTOS JUGADOS
    const totalMinutosJugados = juegos.reduce((acumulador, juego) => {
      const calcularMinutos = Number(juego.minutosjug[0]); // Asegurarse de que es un número
      const calcularSegundos = juego.minutosjug.length === 2 ? Number(juego.minutosjug[1]) : 0; // Asegurarse de que es un número
      const minutosTotales = calcularMinutos + (calcularSegundos / 60);
      return acumulador + minutosTotales;
    }, 0);
    const promedioMinutosJugados = totalMinutosJugados / juegos.length;
    this.datosPromedio.minutosJugados = promedioMinutosJugados;
  }
  

  player: any = {
    fondo: 'assets/imgs/escudos/fondoU.png',
    image: 'assets/imgs/avatars/men/avatar1.png',
    imgEscudo: "assets/imgs/escudos/ucundinamarca.png"
  };

}
