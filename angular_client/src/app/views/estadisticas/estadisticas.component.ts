import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CardTeamComponent } from '../../components/card-team/card-team.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CardComponent, CardTeamComponent, CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {

  private baseUrl: string = environment.apiBaseUrl; 
  topEquipo: any[] = [];
  equipoUrl: string = '/equipo?id=';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { 
    const urlTeamsTop: string = `${this.baseUrl}/juegos/stats/equipos`;
    this.http.get(urlTeamsTop).subscribe((response: any) => {
      this.topEquipo = response;
      }, (err)=>[
        console.log(err)
      ]);
    
  }
}
