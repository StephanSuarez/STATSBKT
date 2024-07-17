import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardTeamComponent } from '../../components/card-team/card-team.component';
import { PlusComponent } from '../../components/plus/plus.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CardTeamComponent, CommonModule, PlusComponent],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent {

  private apiUrl = environment.apiBaseUrl;
  public equipos = [];
  public log: boolean = false
  constructor(private router: Router, private http: HttpClient) {}

  adminLogeado: boolean = false;

  ngOnInit(): void{
    this.log = localStorage.getItem('isAdminLoggedIn') == 'true';
    if(this.log){
      this.adminLogeado = true;
    }

    this.getData().subscribe(
      (data)=>{
        this.equipos = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/equipos`);
  }

  irAdEquipos() {
    this.router.navigate(['/admin-equipos']);
  }
}
