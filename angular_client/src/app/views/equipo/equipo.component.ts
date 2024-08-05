import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CardPlayerComponent } from '../../components/card-player/card.component';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [CommonModule, CardPlayerComponent],
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
      this.obtenerJugadoresPorEquipo(jugadoresUrl).subscribe(
        (res) => {
          this.jugadores = res;
        },
        (err) => {
          console.log(err);
        }
      );
      this.obtenerEquipo(equipoUrl);
    });
  }

  obtenerJugadoresPorEquipo(url: string) {
    return this.http.get(url);
  }

  obtenerEquipo(url: string) {
    this.http.get(url).subscribe(
      (data: any) => {
        this.nombreEquipo = data.nombreEquipo;
      },  
      (err) => {
        console.log(err);
      }
    );
  }
}
