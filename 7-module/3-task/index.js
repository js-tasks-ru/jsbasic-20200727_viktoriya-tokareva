export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.elem.addEventListener('click', (event) => this.stepActive(event));
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

  stepActive(event) {
    let sliderStepsDiv = this.elem.querySelector('.slider__steps');
    let sliderSteps = sliderStepsDiv.children;
    Array.from(sliderSteps).map(elem => {
      elem.classList.remove('slider__step-active');
      event.target.classList.add('slider__step-active');
    });
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
