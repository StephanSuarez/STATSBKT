// leads-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent {
  
  leadsSections = [
    {
      title: 'Rebotes',
      leads: [
        { number: 10, image: 'assets/imgs/danielmora.png', name: 'Daniel Mora', team: 'Ucundinamarca', rebotes: 10, asistencias: 5, puntos: 20 },
        { number: 7, image: 'assets/imgs/danielmora.png', name: 'John Doe', team: 'Ucundinamarca', rebotes: 7, asistencias: 8, puntos: 25 },
        { number: 12, image: 'assets/imgs/danielmora.png', name: 'Jane Smith', team: 'Universidad Libre', rebotes: 12, asistencias: 6, puntos: 18 }
      ]
    },
    {
      title: 'Asistencias',
      leads: [
        { number: 10, image: 'assets/imgs/danielmora.png', name: 'Daniel Mora', team: 'Ucundinamarca', rebotes: 10, asistencias: 5, puntos: 20 },
        { number: 7, image: 'assets/imgs/danielmora.png', name: 'John Doe', team: 'Ucundinamarca', rebotes: 7, asistencias: 8, puntos: 25 },
        { number: 12, image: 'assets/imgs/danielmora.png', name: 'Jane Smith', team: 'Universidad Libre', rebotes: 12, asistencias: 6, puntos: 18 }
      ]
    },
    {
      title: 'Puntos',
      leads: [
        { number: 10, image: 'assets/imgs/danielmora.png', name: 'Daniel Mora', team: 'Ucundinamarca', rebotes: 10, asistencias: 5, puntos: 20 },
        { number: 7, image: 'assets/imgs/danielmora.png', name: 'John Doe', team: 'Ucundinamarca', rebotes: 7, asistencias: 8, puntos: 25 },
        { number: 12, image: 'assets/imgs/danielmora.png', name: 'Jane Smith', team: 'Universidad Libre', rebotes: 12, asistencias: 6, puntos: 18 }
      ]
    }
  ];
}
