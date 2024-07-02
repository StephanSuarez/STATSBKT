import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CardTeamComponent } from '../../components/card-team/card-team.component';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CardComponent, CardTeamComponent],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {

}
