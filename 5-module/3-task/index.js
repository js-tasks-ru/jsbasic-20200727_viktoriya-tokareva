function initCarousel() {
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
	let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let slides = carouselInner.children;

  let step = 0;
  let slideWidth = carouselInner.firstElementChild.offsetWidth;

  if (slides[step] == carouselInner.firstElementChild) {
    carouselArrowLeft.style.display = 'none';
  }
  
  function translateSlide() {
    carouselInner.style.transform = 'translateX(' + (-slideWidth) * step + 'px)';

    if (slides[step] == carouselInner.lastElementChild) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowRight.style.display = 'flex';
    }

    if (slides[step] == carouselInner.firstElementChild) {
      carouselArrowLeft.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = 'flex';
    }
  }

  carouselArrowRight.addEventListener('click', function rightStep () {
    step++;
    translateSlide();
  });
  
  carouselArrowLeft.addEventListener('click', function lestStep () {
    step--;
    translateSlide();
	});
}
