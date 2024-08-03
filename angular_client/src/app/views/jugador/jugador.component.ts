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
  datosPromedioTabla={
    minutosJugados: 0,
    puntos: 0,
    rebotes: 0,
    asistencias: 0,
    // 
    tirosTotales: "",
    tirosdos: "",
    tirostres: "",
    tirosLibres: ""
  }
  totalParaTabla={
    minutosJugados: 0,
    puntos: 0,
    rebotes: 0,
    asistencias: 0,
    // 
    tirosTotales: "",
    tirosdos: "",
    tirostres: "",
    tirosLibres: ""
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
          const urlEstadisticas = `${this.apiUrl}/juegos/estadisticas/${this.jugadorId}`;
          return this.obtenerEstadisticasJugador(urlEstadisticas);
        })
      ).subscribe(
        (estadisticasJugador) => {
          this.estadisticasJugador = estadisticasJugador;
          this.calcularDatosPromedio(estadisticasJugador);
          this.calcularDatosTabla(estadisticasJugador);
          this.calcularDatosPromedioTabla(estadisticasJugador);
          this.calcularDatosTotalTabla(estadisticasJugador);
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

  calcularDatosPromedioTabla(juegos: any){
    this.datosPromedioTabla.puntos = this.datosPromedio.puntos;
    this.datosPromedioTabla.minutosJugados = this.datosPromedio.minutosJugados;
    this.datosPromedioTabla.rebotes = this.datosPromedio.rebotes;
    this.datosPromedioTabla.asistencias = this.datosPromedio.asistencias;
    
    // this.datosPromedioTabla.tirosLibres
    let tlNumerador = 0;
    let tlDenominador = 0;
    let tdNumerador = 0;
    let tdDenominador = 0;
    let ttNumerador = 0;
    let ttDenominador = 0;
    let totalNumerador = 0;
    let totalDenominador = 0;
    for(let juego of juegos){
      // uno
      tlNumerador += juego.tirolibreE
      tlDenominador += juego.tirolibreF + juego.tirolibreE
      // dos
      tdNumerador += juego.dosPuntosE
      tdDenominador += juego.dosPuntosF + juego.dosPuntosE
      // tres
      ttNumerador += juego.tresPuntosE
      ttDenominador += juego.tresPuntosF + juego.tresPuntosE
      // total
      totalNumerador += juego.tirolibreE + juego.dosPuntosE + juego.tresPuntosE;
      totalDenominador += juego.tirolibreF + juego.tirolibreE + juego.dosPuntosF + juego.dosPuntosE + juego.tresPuntosF + juego.tresPuntosE;
    }
    this.datosPromedioTabla.tirosLibres = ""+(tlNumerador/juegos.length).toFixed(2)+ " / "+ (tlDenominador/juegos.length).toFixed(2);
    this.datosPromedioTabla.tirosdos = ""+(tdNumerador/juegos.length).toFixed(2)+ " / "+ (tdDenominador/juegos.length).toFixed(2);
    this.datosPromedioTabla.tirostres = ""+(ttNumerador/juegos.length).toFixed(2)+ " / "+ (ttDenominador/juegos.length).toFixed(2);
    this.datosPromedioTabla.tirosTotales = "" + (totalNumerador / juegos.length).toFixed(2) + " / " + (totalDenominador / juegos.length).toFixed(2);
  }

  calcularDatosTotalTabla(juegos: any){
    this.totalParaTabla.rebotes = 0;
    this.totalParaTabla.asistencias = 0;

    // Inicializamos los acumuladores
    let tlNumerador = 0;
    let tlDenominador = 0;
    let tdNumerador = 0;
    let tdDenominador = 0;
    let ttNumerador = 0;
    let ttDenominador = 0;
    let totalNumerador = 0;
    let totalDenominador = 0;
    let totalPuntos = 0;

    // Acumulamos los valores
    for(let juego of juegos){

        const puntos: number = (juego.dosPuntosE * 2 + juego.tresPuntosE * 3 + juego.tirolibreE);
        totalPuntos += puntos;

        this.totalParaTabla.puntos += juego.puntos;
        this.totalParaTabla.minutosJugados += juego.minutosJugados;
        this.totalParaTabla.rebotes += juego.rebotes;
        this.totalParaTabla.asistencias += juego.asistencias;

        // Tiros libres
        tlNumerador += juego.tirolibreE;
        tlDenominador += juego.tirolibreF + juego.tirolibreE;
        // Tiros de dos puntos
        tdNumerador += juego.dosPuntosE;
        tdDenominador += juego.dosPuntosF + juego.dosPuntosE;
        // Tiros de tres puntos
        ttNumerador += juego.tresPuntosE;
        ttDenominador += juego.tresPuntosF + juego.tresPuntosE;
        // Total de tiros
        totalNumerador += juego.tirolibreE + juego.dosPuntosE + juego.tresPuntosE;
        totalDenominador += juego.tirolibreF + juego.tirolibreE + juego.dosPuntosF + juego.dosPuntosE + juego.tresPuntosF + juego.tresPuntosE;
    }

    // Asignamos los valores totales
    this.totalParaTabla.tirosLibres = `${tlNumerador} / ${tlDenominador}`;
    this.totalParaTabla.tirosdos = `${tdNumerador} / ${tdDenominador}`;
    this.totalParaTabla.tirostres = `${ttNumerador} / ${ttDenominador}`;
    this.totalParaTabla.tirosTotales = `${totalNumerador} / ${totalDenominador}`;
    this.totalParaTabla.puntos = totalPuntos;
    
    // Minutos
    const totalMinutosJugados = juegos.reduce((acumulador: any, juego: any) => {
      const calcularMinutos = Number(juego.minutosjug[0]); // Asegurarse de que es un número
      const calcularSegundos = juego.minutosjug.length === 2 ? Number(juego.minutosjug[1]) : 0; // Asegurarse de que es un número
      const minutosTotales = calcularMinutos + (calcularSegundos / 60);
      return acumulador + minutosTotales;
    }, 0);
    this.totalParaTabla.minutosJugados = parseFloat(totalMinutosJugados.toFixed(2));
}

  
  calcularDatosTabla(juegos: any){
    this.juegosDatos = []
    for(let juego of juegos){
      const dato = {
        vs: juego.equipoRival.nombreEquipo,
        minjug: this.calcularMinutos(juego.minutosjug),
        pts: this.calcularPuntos(juego.dosPuntosE, juego.tresPuntosE, juego.tirolibreE),
        tc: `${juego.dosPuntosE+juego.tresPuntosE+juego.tirolibreE}/${juego.dosPuntosE+juego.dosPuntosF+juego.tresPuntosE+juego.tresPuntosF+juego.tirolibreE+juego.tirolibreF}`,
        dosPts: `${juego.dosPuntosE}/${juego.dosPuntosE+juego.dosPuntosF}`,
        tresPts: `${juego.tresPuntosE}/${juego.tresPuntosE+juego.tresPuntosF}`,
        tl: `${juego.tirolibreE}/${juego.tirolibreE+juego.tirolibreF}`,
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
    let [dosPts, tresPts, tl] = pts
    let puntosTotales: number = dosPts*2 + tresPts*3 + tl
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
        this.calcularDatosPromedio(estadisticas);
        this.calcularDatosTabla(estadisticas);
        this.calcularDatosPromedioTabla(estadisticas);
        this.calcularDatosTotalTabla(estadisticas);
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
  tl: string;
  rebo: number;
  ast: number;
}
