import { Component } from '@angular/core';
import { CardTeamComponent } from '../../components/card-team/card-team.component';


@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CardTeamComponent],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent {

}
