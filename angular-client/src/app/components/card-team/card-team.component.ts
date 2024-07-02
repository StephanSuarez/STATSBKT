import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-team.component.html',
  styleUrl: './card-team.component.css'
})
export class CardTeamComponent {
  constructor(private router: Router) { }
  equipos = [
    {
      id: '1',
      nombre: "Ucundinamarca",
      escudoUrl: "assets/imgs/escudos/ucundinamarca.png"
    }
  ]

  goToView(equipoId: string) {
    this.router.navigate(['/equipo'], { queryParams: { id: equipoId } });
  }
  
}
