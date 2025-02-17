class Item {
  /**
   * Creates an instance of an item with specified properties.
   * @param {number} id - The unique identifier for the item.
   * @param {string} name - The name of the item.
   * @param {string} category - The category to which the item belongs.
   * @param {string} rarity - The rarity classification of the item.
   * @param {string} description - A brief description of the item.
   */
  constructor(id, name, category, rarity, description) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.rarity = rarity;
    this.description = description;
  }

  /**
   * Returns a string containing all the information about the item.
   * @returns {string} A string containing the id, name, category, rarity,
   * and description of the item.
   */
  getInfo() {
    return `Info about item: id - ${this.id} name - ${this.name},
    category - ${this.category}, rarity - ${this.rarity}, description - ${this.description}`;
  }
}

class Weapon extends Item {
  /**
   * @param {number} id - id of the weapon
   * @param {string} name - name of the weapon
   * @param {string} category - category of the weapon
   * @param {string} rarity - rarity of the weapon
   * @param {string} description - description of the weapon
   * @param {number} damage - the amount of damage the weapon deals
   */
  constructor(id, name, category, rarity, description, damage) {
    super(id, name, category, rarity, description);
    this.damage = damage;
  }

  /**
   * Simulates an attack with the weapon, returning a string
   * indicating the name of the weapon and the damage dealt.
   * @returns {string} A message indicating the weapon used and the damage dealt.
   */
  attack() {
    return `"Оружие ${this.name} наносит ${this.damage} урона!".`;
  }

  /**
   * Returns a string containing all the information about the weapon.
   * This method is overridden from the Item class to include the damage
   * of the weapon.
   * @returns {string} A string containing all the information about the weapon
   */
  getInfo() {
    const itemInfo = super.getInfo();
    return `${itemInfo}, damage - ${this.damage}`;
  }
}

export { Weapon, Item };

export default Item;
