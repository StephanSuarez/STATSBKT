import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(private router: Router) {}

  @Input() player: any;
  @Input() statType: any;
  imageurl: string = "/assets/imgs/avatars/men/avatar1.png"

  ngOninIt(){
    console.log("-------- ")  
    console.log(this.player)  
  }

  getStatValue() {
    switch (this.statType) {
      case 'rebotes':
        return this.player.rebotes;
      case 'asistencias':
        return this.player.asistencias;
      case 'puntos':
        return this.player.totalPuntos;
      default:
        return '';
    }
  }
  
  goToView(judagorId: string) {
    this.router.navigate(['/jugador'], { queryParams: { id: judagorId } });
  }
}
