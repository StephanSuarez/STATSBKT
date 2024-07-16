import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private router: Router) {}

  adminLogeado: boolean = false;

  ngOnInit() {
    this.adminLogeado = localStorage.getItem('isAdminLoggedIn') == 'true';
    console.log(this.adminLogeado)
  }

  cerrarSesion() {
    localStorage.removeItem('isAdminLoggedIn');
    this.router.navigate(['/'])
  }
}
