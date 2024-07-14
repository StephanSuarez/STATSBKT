import { Component } from '@angular/core';
import { LeadsListComponent } from '../../components/leads-list/leads-list.component';

@Component({
  selector: 'app-lideres',
  standalone: true,
  imports: [LeadsListComponent],
  templateUrl: './lideres.component.html',
  styleUrl: './lideres.component.css'
})
export class LideresComponent {

}
