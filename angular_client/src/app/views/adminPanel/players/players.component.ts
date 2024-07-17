import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  constructor(private http: HttpClient){}

  private apiUrl = environment.apiBaseUrl;
  auxTeamId = '';

  player = {
    nombreUsuario: '',
    equipoId: 0,
    numero: 0
  };

  equiposDisponibles: any;
  successMessage: string | null = null;

  ngOnInit() {
    this.http.get(`${this.apiUrl}/equipos`).subscribe(
      (res) => {
        this.equiposDisponibles = res;
        console.log(this.equiposDisponibles);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    // String to integer conversion
    this.player.equipoId = parseInt(this.auxTeamId);
    console.log('Formulario enviado:', this.player);
    this.http.post(`${this.apiUrl}/usuarios`, this.player).subscribe(
      (res) => {
        console.log(res);
        this.resetForm();
        this.successMessage = 'Jugador añadido correctamente';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000); // Oculta el mensaje después de 3 segundos
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm() {
    this.player = {
      nombreUsuario: '',
      equipoId: 0,
      numero: 0
    };
    this.auxTeamId = '';
  }

  postData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarioss`);
  }
}
