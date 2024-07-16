import { Component, Input } from '@angular/core';
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

  @Input() equipo: any

  constructor(private router: Router) { }
  

  ngOnInit(){
    this.equipo.escudo = `/assets/imgs/escudos/${this.equipo.escudo}`
    console.log(this.equipo)
  }

  goToView(equipoId: string) {
    this.router.navigate(['/equipo'], { queryParams: { id: equipoId } });
  }
  
}
