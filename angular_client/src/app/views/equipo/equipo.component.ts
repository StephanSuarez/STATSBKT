import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {

  equipoId: string = '';
  nombreEquipo: string = '';
  descripcionEquipo: string = '';
  jugadores: any[] = []

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.equipoId = params['id']
      console.log(this.equipoId)
      this.nombreEquipo = 'Ucundinamarca'
      this.descripcionEquipo = 'la;kfsdj;lkasdjf lk;dsjxf;aoewjoixjflajsd;lfjelsjfi'
      this.jugadores = [
        { id:"1", number: 10, image: 'assets/imgs/danielmora.png', name: 'Daniel Mora', team: 'Ucundinamarca', rebotes: 10, asistencias: 5, puntos: 20 },
        { id:"1", number: 7, image: 'assets/imgs/danielmora.png', name: 'John Doe', team: 'Ucundinamarca', rebotes: 7, asistencias: 8, puntos: 25 },
        { id:"1", number: 12, image: 'assets/imgs/danielmora.png', name: 'Jane Smith', team: 'Universidad Libre', rebotes: 12, asistencias: 6, puntos: 18 },
        { id:"1", number: 10, image: 'assets/imgs/danielmora.png', name: 'Daniel Mora', team: 'Ucundinamarca', rebotes: 10, asistencias: 5, puntos: 20 },
        { id:"1", number: 7, image: 'assets/imgs/danielmora.png', name: 'John Doe', team: 'Ucundinamarca', rebotes: 7, asistencias: 8, puntos: 25 },
        { id:"1", number: 12, image: 'assets/imgs/danielmora.png', name: 'Jane Smith', team: 'Universidad Libre', rebotes: 12, asistencias: 6, puntos: 18 }
      ]
    });
  }
}
