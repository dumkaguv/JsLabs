/**
 * Generates a table row template for an inventory item.
 * @param {number} [id=0] - The id of the item.
 * @param {string} [name=""] - The name of the item.
 * @param {string} [category=""] - The category of the item.
 * @param {string} [rarity=""] - The rarity of the item.
 * @param {string} [damage=""] - The damage of the item.
 * @returns {string} The table row template as a string.
 */
const getTableRowTemplate = (
  id = 0,
  name = "",
  category = "",
  rarity = "",
  damage = ""
) => `
  <tr class="inventory-table__row ${
    rarity === "legendary" ? "is-legendary" : ""
  }" data-js-inventory-table-row data-js-inventory-table-row-id=${id}>
    <td class="inventory-table__cell">${id}. ${name}</td>
    <td class="inventory-table__cell">${category}</td>
    <td class="inventory-table__cell">${rarity}</td>
    <td class="inventory-table__cell">
      <button
        class="button inventory-table__button-delete"
        title="Удалить предмет"
        type="button"
        data-js-inventory-table-delete-button
      >
        X
      </button>
    </td>
    <td class="inventory-table__cell">${damage || "-"}</td>
  </tr>
`;

export default getTableRowTemplate;
