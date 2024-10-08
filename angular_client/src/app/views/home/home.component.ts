import { Component } from '@angular/core';
import { RankingComponent } from '../../components/ranking/ranking.component';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RankingComponent, EstadisticasComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


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
