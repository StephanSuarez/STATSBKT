import { Component } from '@angular/core';
import { RankingComponent } from '../../components/ranking/ranking.component';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RankingComponent, EstadisticasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
