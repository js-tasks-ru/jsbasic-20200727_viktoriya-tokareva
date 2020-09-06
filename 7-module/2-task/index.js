import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.open();
    this.body = document.querySelector('body');
    this.closeButton = this.elem.querySelector('.modal__close');
    this.closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', () => this.close());
  }
  
  render() {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
    
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  
  `;
  return modal;
  }

  open() {
    let body = document.querySelector('body');
    body.classList.add('is-modal-open');
    body.append(this.elem);
  }

  setTitle(modalTitle) {
    let title = this.elem.querySelector('.modal__title');
    title.innerHTML = modalTitle;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector('.modal__body');
    let modalBodyText = node.textContent;
	  modalBody.innerHTML = modalBodyText;
  }

  close() {
      this.elem.remove();
      this.body.classList.remove('is-modal-open');
  } 
}
