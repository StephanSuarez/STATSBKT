import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  player = {
    name: '',
    team: '',
    dorsal: ''
  };

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log('Formulario enviado:', this.player);
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
  }
}
