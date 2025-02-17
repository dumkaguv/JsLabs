import BaseComponent from "./utils/BaseComponent.js";
import ModalInventory from "./ModalInventory.js";

import getTableRowTemplate from "./templates/getTableRowTemplate.js";
import getTableRowEmptyTemplate from "./templates/getTableRowEmptyTemplate.js";

import { Weapon, Item } from "./InventoryItems.js";

const rootSelector = "[data-js-inventory-table]";

/**
 * Class representing the inventory table.
 */
class Inventory extends BaseComponent {
  selectors = {
    tableBody: "[data-js-inventory-table-body]",
    buttonDelete: "[data-js-inventory-table-delete-button]",
    tableRow: "[data-js-inventory-table-row]",
    totalCountItems: "[data-js-total-items-count]",

    fullInfo: "[data-js-item-full-info]",
    fullInfoName: "[data-js-item-full-info-name]",
    fullInfoCategory: "[data-js-item-full-info-category]",
    fullInfoRarity: "[data-js-item-full-info-rarity]",
    fullInfoDescription: "[data-js-item-full-info-description]",
    fullInfoDamage: "[data-js-item-full-info-damage]",
  };

  stateAttributes = {
    tableRowId: "data-js-inventory-table-row-id",
  };

  stateClasses = {
    isDeleting: "is-deleting",
    isLegendary: "is-legendary",
  };

  initialState = {
    data: [],
    currentId: 0,
  };

  /**
   * Creates an instance of Inventory.
   */
  constructor() {
    super();
    this.inventoryModal = new ModalInventory(this.addItem);

    this.rootElement = document.querySelector(rootSelector);
    this.tableBodyElement = this.rootElement.querySelector(
      this.selectors.tableBody
    );
    this.totalCountItemsElement = this.rootElement.querySelector(
      this.selectors.totalCountItems
    );
    this.fullInfoItemElement = this.rootElement.querySelector(
      this.selectors.fullInfo
    );
    this.state = this.getProxyState({
      ...this.initialState,
    });

    this.bindEvents();
    this.updateUI();
  }

  /**
   * Updates the UI to reflect the current state of the inventory.
   * This will clear the table and re-render it based on the current data.
   */
  updateUI = () => {
    const isEmptyTable = this.state.data.length === 0;

    this.tableBodyElement.innerHTML = "";
    this.totalCountItemsElement.textContent = this.state.data.length;

    if (isEmptyTable) {
      this.tableBodyElement.insertAdjacentHTML(
        "beforeEnd",
        getTableRowEmptyTemplate()
      );
      this.state.currentId = 0;

      return;
    }

    this.state.data.forEach((item) => {
      const { id, name, category, rarity } = item;

      const damageInfo = item.attack?.();

      this.tableBodyElement.insertAdjacentHTML(
        "beforeEnd",
        getTableRowTemplate(parseInt(id) + 1, name, category, rarity, damageInfo)
      );
    });
  };

  /**
   * Adds a new item (either Weapon or Item) to the inventory.
   * @param {Object} data - The data to create a new item.
   * @param {string} data.name - The name of the item.
   * @param {string} data.category - The category of the item.
   * @param {string} data.rarity - The rarity of the item.
   * @param {string} data.description - A brief description of the item.
   * @param {string} data.damage - The damage value of the weapon (if applicable).
   */
  addItem = (data) => {
    const isWeapon = data.damage.trim().length > 0;
    const { name, category, rarity, description, damage } = data;

    if (isWeapon) {
      this.state.data.push(
        new Weapon(
          this.state.currentId,
          name,
          category,
          rarity,
          description,
          damage
        )
      );
    } else {
      this.state.data.push(
        new Item(this.state.currentId, name, category, rarity, description)
      );
    }

    this.state.currentId++;
  };

  /**
   * Handles the table click event and delegates the click to the delete button handler.
   * @param {Event} event - The click event.
   */
  onTableClick = (event) => {
    this.onDeleteButtonClick(event);
  };

  /**
   * Handles the click event on the delete button and removes the item from the inventory.
   * @param {Event} event - The click event.
   */
  onDeleteButtonClick = (event) => {
    if (event) {
      const isButtonDeleteElement = event.target.closest(
        this.selectors.buttonDelete
      );

      if (isButtonDeleteElement) {
        const tableRowElement = event.target.closest(this.selectors.tableRow);
        const delayMS = 300;
        const buttonDeleteElement = event.target;

        /**
         * Deletes the item after a delay to show the "deleting" animation.
         */
        const deleteAfterDelay = () => {
          const elementId = tableRowElement.getAttribute(
            this.stateAttributes.tableRowId
          );
          buttonDeleteElement.disabled = true;

          tableRowElement?.classList.add(this.stateClasses.isDeleting);
          setTimeout(() => {
            this.state.data = this.state.data.filter(
              (item) => parseInt(item.id) !== parseInt(elementId - 1)
            );
            this.onRowMouseOut(event);
          }, delayMS);
        };

        deleteAfterDelay();
      }
    }
  };

  onRowMouseOver = (event) => {
    if (event && this.state.data.length > 0) {
      const tableRowElement = event.target.closest(this.selectors.tableRow);
      const elementId =
        parseInt(tableRowElement?.getAttribute(this.stateAttributes.tableRowId)) -
        1;

      if (elementId >= 0) {
        const item = this.state.data.find((element) => element.id === elementId);
        this.fullInfoItemElement.style.display = "grid";

        const { name, category, rarity, description, damage } = item;
        const displayItemInfo = () => {
          this.fullInfoItemElement.querySelector(
            this.selectors.fullInfoName
          ).textContent = name;
          this.fullInfoItemElement.querySelector(
            this.selectors.fullInfoCategory
          ).textContent = category;
          this.fullInfoItemElement.querySelector(
            this.selectors.fullInfoRarity
          ).textContent = rarity;
          this.fullInfoItemElement.querySelector(
            this.selectors.fullInfoDescription
          ).textContent = description;
          this.fullInfoItemElement.querySelector(
            this.selectors.fullInfoDamage
          ).textContent = damage;
        };

        displayItemInfo();
      }
    }
  };

  onRowMouseOut = (event) => {
    const isTableRowElement = event.currentTarget?.closest(
      this.selectors.tableRow
    );

    if (!isTableRowElement) {
      this.fullInfoItemElement.style.display = "none";
    }
  };

  /**
   * Binds the necessary event listeners to the inventory table.
   */
  bindEvents = () => {
    this.rootElement.addEventListener("click", this.onTableClick);
    this.rootElement.addEventListener("mouseover", this.onRowMouseOver);
    this.rootElement.addEventListener("mouseout", this.onRowMouseOut);
  };
}

export default Inventory;
