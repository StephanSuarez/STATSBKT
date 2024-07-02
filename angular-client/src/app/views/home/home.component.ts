import { Component } from '@angular/core';
import { RankingComponent } from '../../components/ranking/ranking.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RankingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
