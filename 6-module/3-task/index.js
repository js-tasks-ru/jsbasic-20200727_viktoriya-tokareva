import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
	constructor(slides) {
	  this.slides = slides;
	  this.elem = this.render(this.slides);  
	  this.arrows();
	  this.elem.addEventListener('click', () => this.onClick(this.slides));
	}
  
	render(slides) {
	  let slider = document.createElement('div');
	  slider.classList.add('carousel');
	  let slide = slides.map(slide => `
	  <div class="carousel__slide" data-id="${slide.id}">
	  <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
	  <div class="carousel__caption">
		<span class="carousel__price">€${slide.price.toFixed(2)}</span>
		<div class="carousel__title">${slide.name}</div>
		<button type="button" class="carousel__button">
		  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
		</button>
	  </div>
	  </div>`).join('');
	  
	  slider.innerHTML = `
	  <div class="carousel__arrow carousel__arrow_right">
		<img src="/assets/images/icons/angle-icon.svg" alt="icon">
	  </div>
	  <div class="carousel__arrow carousel__arrow_left">
		<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
	  </div>
	  <div class="carousel__inner">${slide}</div>`;
	  
	  return slider;
	};
	
	arrows () {
	  let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
	  let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
	  let carouselInner = this.elem.querySelector('.carousel__inner');
	  let slides = carouselInner.children;
	  let step = 0;
	  let slideWidth;
	  
	  if (slides[step] == carouselInner.firstElementChild) {
		carouselArrowLeft.style.display = 'none';
	  }
	  
	  function translateSlide() {
		slideWidth = carouselInner.firstElementChild.offsetWidth;  
		carouselInner.style.transform = `translateX(${-slideWidth * step}px)`;
		
		if (slides[step] == carouselInner.lastElementChild) {
		  carouselArrowRight.style.display = 'none';
		} else {
		  carouselArrowRight.style.display = '';
		}
  
		if (slides[step] == carouselInner.firstElementChild) {
		  carouselArrowLeft.style.display = 'none';
		} else {
		  carouselArrowLeft.style.display = '';
		}
	  }
  
	  carouselArrowRight.addEventListener('click', function () {
		step++;
		translateSlide();
	  });
  
	  carouselArrowLeft.addEventListener('click', function () {
		step--;
		translateSlide();
	  });
	}
	
	onClick(slides) {
	  if (event.target.classList.contains("carousel__button")) {
		  this.elem.dispatchEvent(new CustomEvent("product-add", {
		    detail: slides[0].id,
		    bubbles: true
		  }));
	  }
	}
  
}
  