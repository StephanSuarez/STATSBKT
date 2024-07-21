import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-team.component.html',
  styleUrl: './card-team.component.css'
})
export class CardTeamComponent implements OnInit {

  @Input() equipo: any;

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.equipo && this.equipo.escudo) {
      this.equipo.escudo = this.sanitizer.bypassSecurityTrustUrl(this.equipo.escudo);
    }
    console.log(this.equipo.escudo);
  }

  goToView(equipoId: string): void {
    this.router.navigate(['/equipo'], { queryParams: { id: equipoId } });
  }
}
