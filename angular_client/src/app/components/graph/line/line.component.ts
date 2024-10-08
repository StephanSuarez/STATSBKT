import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnChanges {
  @Input() fechaGrafica: string[] = [];
  @Input() minutosGrafica: number[] = [];
  @Input() puntosGrafica: number[] = [];
  @Input() rebotesGrafica: number[] = [];
  @Input() asistenciasGrafica: number[] = [];

  chart: any;

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart() {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.fechaGrafica,
          datasets: [
            {
              label: 'Minutos Jugados',
              data: this.minutosGrafica,
              borderColor: '#1E90FF', // Azul claro
              backgroundColor: 'rgba(30, 144, 255, 0.2)', // Azul claro con opacidad
              pointBorderColor: '#1E90FF',
              pointBackgroundColor: '#fff',
              pointHoverBackgroundColor: '#1E90FF',
              pointHoverBorderColor: '#fff',
              fill: true
            },
            {
              label: 'Puntos',
              data: this.puntosGrafica,
              borderColor: '#32CD32', // Verde lima
              backgroundColor: 'rgba(50, 205, 50, 0.2)', // Verde lima con opacidad
              pointBorderColor: '#32CD32',
              pointBackgroundColor: '#fff',
              pointHoverBackgroundColor: '#32CD32',
              pointHoverBorderColor: '#fff',
              fill: true
            },
            {
              label: 'Rebotes',
              data: this.rebotesGrafica,
              borderColor: '#FF4500', // Naranja rojo
              backgroundColor: 'rgba(255, 69, 0, 0.2)', // Naranja rojo con opacidad
              pointBorderColor: '#FF4500',
              pointBackgroundColor: '#fff',
              pointHoverBackgroundColor: '#FF4500',
              pointHoverBorderColor: '#fff',
              fill: true
            },
            {
              label: 'Asistencias',
              data: this.asistenciasGrafica,
              borderColor: '#8A2BE2', // Azul violeta
              backgroundColor: 'rgba(138, 43, 226, 0.2)', // Azul violeta con opacidad
              pointBorderColor: '#8A2BE2',
              pointBackgroundColor: '#fff',
              pointHoverBackgroundColor: '#8A2BE2',
              pointHoverBorderColor: '#fff',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false
            },
            legend: {
              labels: {
                color: '#fff' // Color del texto de la leyenda
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Fecha',
                color: '#fff'
              },
              grid: {
                color: '#444'
              },
              ticks: {
                color: '#fff'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Valores',
                color: '#fff'
              },
              grid: {
                color: '#444'
              },
              ticks: {
                color: '#fff'
              }
            }
          }
        }
      });
    }
  }
}
