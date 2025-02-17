const rootSelector = "[data-js-modal]";

/**
 * Class representing a modal inventory.
 */
class ModalInventory {
  selectors = {
    buttonOpen: "[data-js-inventory-table-add-item-button]",
    buttonClose: "[data-js-modal-button-close]",
    buttonSubmit: "[data-js-modal-content-button-submit]",
    modalContent: "[data-js-modal-content]",
  };

  /**
   * Creates an instance of ModalInventory.
   * @param {function} onSubmit - The callback that will be called when the form is submitted.
   */
  constructor(onSubmit) {
    this.rootElement = document.querySelector(rootSelector);
    this.onSubmit = onSubmit;

    this.modalContentElement = this.rootElement.querySelector(
      this.selectors.modalContent
    );
    this.buttonOpenModalElement = document.querySelector(
      this.selectors.buttonOpen
    );
    this.buttonCloseElement = this.rootElement.querySelector(
      this.selectors.buttonClose
    );
    this.buttonSubmitElement = this.rootElement.querySelector(
      this.selectors.buttonSubmit
    );

    this.bindEvents();
  }

  /**
   * Handles the modal click event.
   * @param {Event} event - The click event.
   */
  onModalClick = (event) => {
    this.onSubmitClick(event);
    this.closeModal(event);
  };

  /**
   * Closes the modal if the click is outside the modal content or on the close button.
   * @param {Event} event - The click event.
   * @param {boolean} [forceClose=false] - Forces the modal to close if true.
   */
  closeModal = (event, forceClose = false) => {
    if (!event) return;

    const isClickOutsideModalContent = !event.target.closest(
      this.selectors.modalContent
    );
    const isClickOnButtonCloseModal = event.target === this.buttonCloseElement;

    if (isClickOutsideModalContent || isClickOnButtonCloseModal || forceClose) {
      this.rootElement.style.display = "none";
    }
  };

  /**
   * Opens the modal when the open button is clicked.
   * @param {Event} event - The click event.
   */
  openModal = (event) => {
    const isClickOnButtonOpenModal = event?.target === this.buttonOpenModalElement;

    if (isClickOnButtonOpenModal) {
      this.rootElement.style.display = "block";
    }
  };

  /**
   * Handles the form submit click event.
   * @param {Event} event - The click event.
   */
  onSubmitClick = (event) => {
    if (!event) return;
    event.preventDefault();

    if (event.target === this.buttonSubmitElement) {
      const formData = new FormData(this.modalContentElement);
      const data = Object.fromEntries(formData.entries());

      if (this.modalContentElement.checkValidity()) {
        this.onSubmit(data);
        this.closeModal(event, true);
        this.modalContentElement.reset();
      } else {
        this.modalContentElement.reportValidity();
      }
    }
  };

  /**
   * Binds the necessary event listeners to the modal.
   */
  bindEvents = () => {
    this.rootElement.addEventListener("click", this.onModalClick);
    this.buttonOpenModalElement.addEventListener("click", this.openModal);
  };
}

export default ModalInventory;
