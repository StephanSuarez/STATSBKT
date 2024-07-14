import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CardTeamComponent } from '../../components/card-team/card-team.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CardComponent, CardTeamComponent, CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  stats = [
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 1', avgPoints: 85, wins: 20, losses: 5 },
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 2', avgPoints: 78, wins: 18, losses: 7 },
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 3', avgPoints: 92, wins: 22, losses: 3 },
    // Añade más equipos según sea necesario
  ];

  constructor() { }

  ngOnInit(): void { }
}
