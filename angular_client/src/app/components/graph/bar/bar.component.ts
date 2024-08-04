import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent implements OnInit {

  public chart: Chart;

  ngOnInit(): void {

  const labels = ['a', 'b', 'c', 'd'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3,4],
        borderColor: 'rgb(14,53,150)',
        backgroundColor: 'rgb(15, 35, 51)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: [5,6,7,8],
        borderColor: 'rgb(200,111,150)',
        backgroundColor: 'rgb(15, 135, 91)',
        tension: 0.1,
        yAxisID: 'y',
      }
    ]
  };

    this.chart = new Chart("barChart", {
      type: "bar",
      data
    })
  }
}
