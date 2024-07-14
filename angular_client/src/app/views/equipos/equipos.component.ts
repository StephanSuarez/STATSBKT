import { Component } from '@angular/core';
import { CardTeamComponent } from '../../components/card-team/card-team.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CardTeamComponent, CommonModule],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent {

  constructor(private router: Router) {}

  adminLogeado: boolean = false;

  ngOnInit(): void{
    const log = localStorage.getItem('isAdminLoggedIn');
    this.adminLogeado = true;
  }

  irAdEquipos() {
    this.router.navigate(['/admin-equipos']);
  }
}
