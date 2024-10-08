import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';
import { S3UploadService } from '../../../core/services/s3-upload.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  constructor(private s3UploadService: S3UploadService, private http: HttpClient){}

  apiBaseUrl = environment.apiBaseUrl
  successMessage: string | null = null;
  team = {
    nombre: '',
    escudo: null
  };

  selectedFile: File | null=null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if(this.selectedFile){
      this.s3UploadService.uploadTeamFile(this.selectedFile).subscribe({
        next: (response: any) =>{
          const s3Url = `https://statsbkt-bucket-imgs-public.s3.amazonaws.com/teams/${this.selectedFile!.name}`;
          this.team.escudo = s3Url;
          this.saveTeamData();
        }
      })
    }
  }

  saveTeamData(){
    console.log("sending data")
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
    this.selectedFile = null;
  }
}
