import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render(categories);
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonArrows ();
    this.ribbonArrowRight.addEventListener('click', () => this.scrollRight());
    this.ribbonArrowLeft.addEventListener('click', () => this.scrollLeft());
    this.elem.addEventListener('click', (event) => this.chooseRibbonItem(event));
  }

  render(categories){
    let ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');
    ribbon.innerHTML = `
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner"></nav>
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`;
    let ribbonInner = ribbon.querySelector('.ribbon__inner');
    let ribbonElem = categories.map(category => `
    <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
    `).join('');
    ribbonInner.innerHTML = ribbonElem;
    return ribbon;
  }
  
  scrollRight() {
    this.ribbonInner.scrollBy(350, 0);
  }

  scrollLeft() {
    this.ribbonInner.scrollBy(-350, 0);
  }

  ribbonArrows (){
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrows = this.elem.querySelectorAll('.ribbon__arrow');
    ribbonArrowRight.classList.add('ribbon__arrow_visible');
    ribbonArrowLeft.classList.remove('ribbon__arrow_visible');

    for (let arrow of arrows) {
      arrow.addEventListener('click', function () {
        let scrollLeft = ribbonInner.scrollLeft;
        let clientWidth = ribbonInner.clientWidth;
        let scrollWidth = ribbonInner.scrollWidth;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;
      
        if (scrollLeft == 0 ) {
          ribbonArrowLeft.classList.toggle('ribbon__arrow_visible');
        } 
        if (scrollRight < 1 ) {
          ribbonArrowRight.classList.toggle('ribbon__arrow_visible');
        } 
    });
    }
  } 
  
  chooseRibbonItem(event) {
    let elems = this.elem.querySelectorAll('.ribbon__item');
    Array.from(elems).map(elem => {
        elem.classList.remove('ribbon__item_active');
        event.preventDefault();
        event.target.classList.add('ribbon__item_active');

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true
        }));
    });
  }
  
}
