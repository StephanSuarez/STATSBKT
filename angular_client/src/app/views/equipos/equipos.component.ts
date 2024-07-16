import { Component } from '@angular/core';
import { CardTeamComponent } from '../../components/card-team/card-team.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CardTeamComponent, CommonModule],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent {

  private apiUrl = 'http://localhost:3000/equipos';
  public equipos = [];
  public log: boolean = false
  constructor(private router: Router, private http: HttpClient) {}

  adminLogeado: boolean = false;

  ngOnInit(): void{
    this.log = localStorage.getItem('isAdminLoggedIn') == 'true';
    this.adminLogeado = true;

    this.getData().subscribe(
      (data)=>{
        console.log("hafsd")

        this.equipos = data;
        console.log(this.equipos)
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  irAdEquipos() {
    this.router.navigate(['/admin-equipos']);
  }
}
