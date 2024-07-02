import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  teams = [
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 1', rebounds: 12, assists: 7, totalPoints: 28 },
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 2', rebounds: 10, assists: 10, totalPoints: 25 },
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 3', rebounds: 15, assists: 5, totalPoints: 30 },
    // Añade más jugadores según sea necesario
  ];

  constructor() { }

  ngOnInit(): void { }
}
