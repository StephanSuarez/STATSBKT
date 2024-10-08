import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { S3UploadService } from '../../../core/services/s3-upload.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  constructor(private s3UploadService: S3UploadService, private http: HttpClient){}

  private apiUrl = environment.apiBaseUrl;
  auxTeamId = '';

  player = {
    nombreUsuario: '',
    equipoId: 0,
    numero: 0,
    avatarImg: ''
  };

  equiposDisponibles: any;
  selectedFile: File | null=null;
  successMessage: string | null = null;

  ngOnInit() {
    this.http.get(`${this.apiUrl}/equipos`).subscribe(
      (res) => {
        this.equiposDisponibles = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  uploadAvatar(event: any){
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if(this.selectedFile){
      this.s3UploadService.uploadPlayerFile(this.selectedFile).subscribe({
        next: (res) => {
          const s3Url = `https://statsbkt-bucket-imgs-public.s3.amazonaws.com/players/${this.selectedFile!.name}`;
          this.player.avatarImg = s3Url
          this.addPlayer()
        }
      });
    }
  }

  addPlayer(){
    // String to integer conversion
    this.player.equipoId = parseInt(this.auxTeamId);
    console.log('Formulario enviado:', this.player);
    this.http.post(`${this.apiUrl}/usuarios`, this.player).subscribe(
      (res) => {
        this.resetForm();
        this.successMessage = 'Jugador añadido correctamente';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000); 
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
      numero: 0,
      avatarImg: ''
    };
    this.auxTeamId = '';
    this.selectedFile = null;
  }

  postData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarioss`);
  }
}
