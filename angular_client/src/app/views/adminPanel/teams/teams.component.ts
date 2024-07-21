import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  constructor(private http: HttpClient){}

  apiBaseUrl = environment.apiBaseUrl
  successMessage: string | null = null;
  team = {
    nombre: '',
    escudo: null
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any)=>{
        this.team.escudo = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Formulario enviado:', this.team);
    this.http.post(`${this.apiBaseUrl}/equipos`, this.team).subscribe(
      (res) => {
        this.resetForm();
        this.successMessage = 'Equipo añadido correctamente';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      (err) => {
        console.log('Erro:', err);
      }
    );
  }

  resetForm() {
    this.team = {
      nombre: '',
      escudo: null
    };
  }
}
