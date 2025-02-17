/**
 * Generates a table row template with an empty inventory message.
 * @returns {string} The table row template as a string.
 */
const getTableRowEmptyTemplate = () => `
  <tr class="inventory-table__row">
    <td colspan="5" class="inventory-table__cell" style="text-align: center;">
      Ваш инвентарь, пока что пустой 😔. Добавьте хотя бы 1 предмет.
    </td>
  </tr>
`;

export default getTableRowEmptyTemplate;
