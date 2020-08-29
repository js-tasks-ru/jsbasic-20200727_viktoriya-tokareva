import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = this.render(product);
    this.button = this.elem.querySelector('.card__button');
    this.product = product;
    this.id = product.id;
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  render(product) {
    let card = document.createElement('div');
    card.classList.add("card");
    card.innerHTML = `
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
    return card;
  };

  onClick(event) {
    if (event.target.classList.contains("card__button")) {
      this.elem.dispatchEvent(new CustomEvent("product-add", { 
        detail: this.product.id,
        bubbles: true
      }));
    }
  }
}