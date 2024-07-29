import { Component } from '@angular/core';
import { LeadsListComponent } from '../../components/leads-list/leads-list.component';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lideres',
  standalone: true,
  imports: [LeadsListComponent],
  templateUrl: './lideres.component.html',
  styleUrl: './lideres.component.css'
})
export class LideresComponent {

  private baseUrl: string = `${environment.apiBaseUrl}/juegos/stats`;
  leadsSections: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
    const astUrl: string = `${this.baseUrl}/asistencias`
    const rbtUrl: string = `${this.baseUrl}/rebotes`
    const ptsUrl: string = `${this.baseUrl}/puntos`
    this.getTopthree(astUrl).subscribe(
      (data: any)=>{
        let datos = {
          title: 'Asistencias',
          leads: data
        }
        this.leadsSections.push(datos)
      },
      (err)=>{
        console.log(err)
      }
    );
    this.getTopthree(rbtUrl).subscribe(
      (data: any)=>{
        let datos = {
          title: 'Rebotes',
          leads: data
        }
        this.leadsSections.push(datos)
      },
      (err)=>{
        console.log(err)
      }
    );
    this.getTopthree(ptsUrl).subscribe(
      (data: any)=>{
        let datos = {
          title: 'Puntos',
          leads: data
        }
        this.leadsSections.push(datos)
      },
      (err)=>{
        console.log(err)
      }
    );
    console.log(this.leadsSections)
  }

  getTopthree(url: string){
    return this.http.get(url);
  }
}
