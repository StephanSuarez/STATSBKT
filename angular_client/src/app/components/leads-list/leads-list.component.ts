// leads-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent {
  
  @Input() leadsSections: any;
}
