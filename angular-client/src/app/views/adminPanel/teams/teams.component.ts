import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  team = {
    name: '',
    logo: null
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.team.logo = file;
    }
  }

  onSubmit() {
    console.log('Formulario enviado:', this.team);
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
  }
}
