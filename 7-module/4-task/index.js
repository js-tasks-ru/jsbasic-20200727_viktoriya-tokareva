export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderThumb.addEventListener('pointerdown', (event) => this.sliderThumbDown(event));  
    this.elem.addEventListener('click', () => this.sliderProgress());
  }
  render(){
    let slider = document.createElement('div');
    slider.classList.add('slider');
    slider.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
      </div>
    `;
    let span = `<span></span>`;
    let elem = '';
    for (let i = 0; i < this.steps; i++) {
      elem += span;
    }
    slider.lastElementChild.innerHTML = elem;
    let fistdSpan = slider.lastElementChild.firstElementChild;
    fistdSpan.classList.add('slider__step-active');
    return slider;
  }

  sliderThumbDown ()  {
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    sliderThumb.ondragstart = () => false;
    document.addEventListener('pointermove', this.sliderThumbMove);
    this.elem.classList.add('slider_dragging');
    document.onpointerup =  this.sliderThumbUp;
    
  }

  sliderThumbUp = (event) => {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.sliderThumbMove);
    document.onpointerup = null;
    this.custom();
    
  }

  sliderThumbMove = (event) => {
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 0;
    }
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let leftPercents = leftRelative * 100;
    sliderValue.innerHTML = value;
    sliderThumb.style.left = `${leftPercents}%`; 
    sliderProgress.style.width = `${leftPercents}%`; 
    
  }

  custom = () => {
    let sliderValue = this.elem.querySelector('.slider__value');
    let value = Number(sliderValue.innerHTML);
     if (this.value !== value) {
      this.elem.dispatchEvent(new CustomEvent('slider-change', { 
        detail: value, 
        bubbles: true 
      }));
    }
    this.value = value;
  }
  
  sliderProgress() {
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    sliderValue.innerHTML = value;
    sliderThumb.style.left = `${valuePercents}%`;
    sliderProgress.style.width = `${valuePercents}%`;

    if (this.value !== value) {
    this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: value, 
      bubbles: true 
    }));
    }
    this.value = value;
  }

}
