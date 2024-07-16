import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  constructor(private http: HttpClient){}
  team = {
    nombre: '',
    escudo: null
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.team.escudo = file;
    }
  }

  onSubmit() {
    console.log('Formulario enviado:', this.team);
    this.http.post('http://localhost:3000/equipos', this.team).subscribe(
      (res) => {
        console.log('Resposta do servidor:', res);
      },
      (err) => {
        console.log('Erro:', err);
      }
    );
  }
}
