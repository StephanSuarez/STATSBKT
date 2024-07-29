import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardPlayerComponent {
  constructor(private router: Router) {}

  @Input() player: any;
  imageurl: string = "/assets/imgs/avatars/men/avatar1.png"

  
  goToView(judagorId: string) {
    this.router.navigate(['/jugador'], { queryParams: { id: judagorId } });
  }
}
