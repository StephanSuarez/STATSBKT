import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  teams = [
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 1', rebounds: 12, assists: 7, totalPoints: 28 },
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 2', rebounds: 10, assists: 10, totalPoints: 25 },
    { teamUrl: '/equipo?id=1', teamLogo: 'assets/imgs/escudos/ucundinamarca.png', teamName: 'Equipo 3', rebounds: 15, assists: 5, totalPoints: 30 },
    // Añade más jugadores según sea necesario
  ];

  sliderImages = [
    { src: 'assets/imgs/escudos/fondoU.png', caption: 'Caption One' },
    { src: 'assets/imgs/danielmora.png', caption: 'Caption Two' },
    { src: 'assets/logo.jpg', caption: 'Caption Three' },
    { src: 'assets/imgs/escudos/fondoU.png', caption: 'Caption Four' },
    { src: 'assets/imgs/escudos/fondoU.png', caption: 'Caption Five' }
  ];

  currentSlide = 0;

  constructor() { }

  ngOnInit(): void { }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.sliderImages.length) % this.sliderImages.length;
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
  }

  getSlideClass(index: number): string {
    return index === this.currentSlide ? 'mySlides active' : 'mySlides';
  }
}
