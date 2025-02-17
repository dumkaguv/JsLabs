"use strict";

class Item {
  /**
   * Constructor for Item class
   * @param {string} name - name of the item
   * @param {number} weight - weight of the item
   * @param {string} rarity - rarity of the item
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Returns a string containing information about the item.
   * @returns {string} Information about the item including its name, weight, and rarity.
   */
  getInfo() {
    return `Info about item: name - ${this.name},
    weight - ${this.weight}, rarity - ${this.rarity}`;
  };

  /**
   * Sets the weight of the item.
   * @param {number} newWeight - The new weight of the item.
   */
  setWeight = (newWeight) => {
    this.weight = newWeight;
  };
}

class Weapon extends Item {
  /**
   * Constructor for Weapon class
   * @param {string} name - Name of the weapon.
   * @param {number} weight - Weight of the weapon.
   * @param {string} rarity - Rarity of the weapon.
   * @param {number} damage - Damage value of the weapon.
   * @param {number} durability - Durability of the weapon.
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Decreases the durability of the weapon by 10 points.
   */
  use = () => {
    if (this.durability > 0) {
      this.durability -= 10;
    } else {
      console.warn("Durability is already 0 or less.");
    }
  }

  /**
   * Sets the durability of the weapon to 100.
   */
  repair = () => {
    this.durability = 100;
  };

  /**
   * Returns a string containing information about the weapon including its name, weight, rarity, damage, and durability.
   * @returns {string} Information about the weapon.
   */
  getInfo() {
    const itemInfo = super.getInfo();
    return `${itemInfo}, damage - ${this.damage}, durability - ${this.durability}`;
  };
}

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword?.getInfo());
sword.setWeight(100.4);
console.log(sword.getInfo())

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow?.getInfo());
bow.use();
console.log(bow.durability);
bow.repair();
bow.setWeight(599);
console.log(bow.getInfo());
