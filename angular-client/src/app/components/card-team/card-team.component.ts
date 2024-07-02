import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-team.component.html',
  styleUrl: './card-team.component.css'
})
export class CardTeamComponent {
  equipos = [
    {
      nombre: "Ucundinamarca",
      escudoUrl: "assets/imgs/danielmora.png"
    }
  ]
}
