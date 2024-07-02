import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {

  equipoId: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.equipoId = params['id']
      console.log(this.equipoId)
    });
  }
}
