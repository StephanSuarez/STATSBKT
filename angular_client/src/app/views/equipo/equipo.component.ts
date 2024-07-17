import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {

  private baseUrl = environment.apiBaseUrl;

  equipoId: string = '';
  nombreEquipo: string = '';
  jugadores: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.equipoId = params['id'];
      const jugadoresUrl = `${this.baseUrl}/usuarios/equipo/${this.equipoId}`;
      const equipoUrl = `${this.baseUrl}/equipos/${this.equipoId}`;
      this.obtenerJugadoresPorEquipo(jugadoresUrl);
      this.obtenerEquipo(equipoUrl);
    });
  }

  obtenerJugadoresPorEquipo(url: string) {
    this.http.get(url).subscribe(
      (res) => {
        console.log(res);
        this.jugadores = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerEquipo(url: string) {
    this.http.get(url).subscribe(
      (data: any) => {
        console.log(data.nombreEquipo);
        this.nombreEquipo = data.nombreEquipo;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
