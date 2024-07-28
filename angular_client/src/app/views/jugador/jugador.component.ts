import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, withXsrfConfiguration } from '@angular/common/http';
import { Observable } from 'rxjs';
import { min, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    minutosJugados: 0,
    totalPartidos: 0
  }
  juegosDatos: JuegoDato[] = [];
  categories: string[] = ["", "Zonal", "Nacional"]
  selectedCategory: string = this.categories[0]; 

  constructor(private router: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.jugadorId = params['id'];
      this.ObtenerJugador(this.jugadorId).pipe(
        switchMap(jugador => {
          this.jugador = jugador;
          return this.obtenerEquipo (jugador.equipoId);
        }),
        switchMap(equipoJugador => {
          this.equipoJugador = equipoJugador;
          const urlEstadisticas = `${this.apiUrl}/juegos/estadisticas/${this.jugadorId}`
          return this.obtenerEstadisticasJugador(urlEstadisticas);
        })
      ).subscribe(
        (estadisticasJugador) => {
          this.estadisticasJugador = estadisticasJugador;
          this.calcularDatosPromedio(estadisticasJugador);
          this.calcularDatosTabla(estadisticasJugador);
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

  obtenerEquipo (id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/equipos/${id}`);
  }

  obtenerEstadisticasJugador(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  calcularDatosPromedio(juegos: any[]) {
    // TOTAL PARTIDOS 
    this.datosPromedio.totalPartidos = juegos.length;

    // PUNTOS
    const totalPuntos = juegos.reduce((acumulador, juego) => {
      const puntos = (juego.dosPuntosE * 2 + juego.tresPuntosE * 3 + juego.tirolibreE);
      return acumulador + puntos;
    }, 0);
    const promedioPuntos = totalPuntos / juegos.length;
    this.datosPromedio.puntos = parseFloat((promedioPuntos).toFixed(2));

    // ASISTENCIAS
    const totalAsistencias = juegos.reduce((acumulador, juego) =>{
      const asistencias = juego.asistencias;
      return acumulador + asistencias;
    }, 0);
    const promedioAsistencias = totalAsistencias / juegos.length;
    this.datosPromedio.asistencias = parseFloat(promedioAsistencias.toFixed(2));

    // REBOTES
    const totalRebotes = juegos.reduce((acumulador, juego)=>{
      const rebotes = juego.rebotes;
      return acumulador + rebotes; 
    }, 0);
    const promedioRebotes = totalRebotes / juegos.length;
    this.datosPromedio.rebotes = parseFloat(promedioRebotes.toFixed(2));

    // MINUTOS JUGADOS
    const totalMinutosJugados = juegos.reduce((acumulador, juego) => {
      const calcularMinutos = Number(juego.minutosjug[0]); // Asegurarse de que es un número
      const calcularSegundos = juego.minutosjug.length === 2 ? Number(juego.minutosjug[1]) : 0; // Asegurarse de que es un número
      const minutosTotales = calcularMinutos + (calcularSegundos / 60);
      return acumulador + minutosTotales;
    }, 0);
    const promedioMinutosJugados = totalMinutosJugados / juegos.length;
    this.datosPromedio.minutosJugados = parseFloat(promedioMinutosJugados.toFixed(2));
  }
  
  calcularDatosTabla(juegos: any){
    this.juegosDatos = []
    for(let juego of juegos){
      const dato = {
        vs: juego.equipoRival.nombreEquipo,
        minjug: this.calcularMinutos(juego.minutosjug),
        pts: this.calcularPuntos(juego.dosPuntosE, juego.tresPuntosE, juego.tirolibreE),
        tc: `${juego.tirolibreE}/${juego.tirolibreE+juego.tirolibreF}`,
        dosPts: `${juego.dosPuntosE}/${juego.dosPuntosE+juego.dosPuntosF}`,
        tresPts: `${juego.tresPuntosE}/${juego.tresPuntosE+juego.tresPuntosF}`,
        rebo: juego.rebotes,
        ast: juego.asistencias
      }
      this.juegosDatos.push(dato)
    }
  }

  calcularMinutos(minutosjug: number[]): number {
    let minutos: any;
    let segundos: number = 0;
  
    if (minutosjug.length === 1) {
      minutos = minutosjug[0];
    } else if (minutosjug.length === 2) {
      minutos = minutosjug[0];
      segundos = minutosjug[1];
    }

    const segAMin: number = parseFloat((segundos/60).toFixed(2));

    let minNum = parseFloat(minutos);
  
    const totalMinutos: number = minNum + segAMin;
  
    return totalMinutos;
  }
  
  calcularPuntos(...pts: number[]){
    let [dosPts, tresPts, tc] = pts
    let puntosTotales: number = dosPts*2 + tresPts*3 + tc
    return puntosTotales
  }

  onCategoryChange(newValue: string): void {
    this.selectedCategory = newValue;
    let urlJuego: string = "";
    if(this.selectedCategory == "Zonal"){
      urlJuego = `${this.apiUrl}/juegos/estadisticas/${this.jugadorId}?categoria=zonal`;
    }
    if(this.selectedCategory == "Nacional"){
      urlJuego = `${this.apiUrl}/juegos/estadisticas/${this.jugadorId}?categoria=nacional`;
    }
    if(this.selectedCategory == ""){
      urlJuego = `${this.apiUrl}/juegos/estadisticas/${this.jugadorId}`;
    }
    this.obtenerEstadisticasJugador(urlJuego).subscribe(
      (estadisticas)=>{
        console.log(estadisticas)
        this.calcularDatosPromedio(estadisticas);
        this.calcularDatosTabla(estadisticas);
      }
    );
  }
  

  player: any = {
    fondo: 'assets/imgs/escudos/fondoU.png',
    image: 'assets/imgs/avatars/men/avatar1.png',
    imgEscudo: "assets/imgs/escudos/ucundinamarca.png"
  };

}

interface JuegoDato {
  vs: string;
  minjug: number;
  pts: number;
  tc: string;
  dosPts: string;
  tresPts: string;
  rebo: number;
  ast: number;
}
