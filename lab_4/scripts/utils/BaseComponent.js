/**
 * Base class for all components. This is an abstract class and cannot be instantiated directly.
 */
class BaseComponent {
  /**
   * Creates an instance of BaseComponent.
   * @throws {Error} Throws an error if trying to instantiate the abstract class directly.
   */
  constructor() {
    if (this.constructor === BaseComponent) {
      throw new Error("Can't instantiate abstract class 'BaseComponent'!");
    }
  }

  /**
   * Creates a proxy state object that triggers `updateUI()` whenever a property is changed.
   * @param {Object} initialState - The initial state to be proxied.
   * @returns {Proxy} A Proxy object that wraps the initialState.
   */
  getProxyState(initialState) {
    return new Proxy(initialState, {
      /**
       * Gets the value of a property from the target state.
       * @param {Object} target - The target state object.
       * @param {string} prop - The property name.
       * @returns {*} The value of the property.
       */
      get: (target, prop) => {
        return target[prop];
      },

      /**
       * Sets a new value to a property in the target state and triggers `updateUI()` if the value changes.
       * @param {Object} target - The target state object.
       * @param {string} prop - The property name.
       * @param {*} newValue - The new value to be set.
       * @param {*} oldValue - The previous value of the property.
       * @returns {boolean} Returns `true` if the operation was successful.
       */
      set: (target, prop, newValue) => {
        const oldValue = target[prop];

        target[prop] = newValue;

        if (newValue !== oldValue) {
          this.updateUI();
        }

        return true;
      },
    });
  }

  /**
   * Updates the UI when the state changes. This method should be implemented in the subclass.
   * @throws {Error} Throws an error if not implemented in the subclass.
   */
  updateUI() {
    throw new Error("Need to be implemented method 'updateUI()'!");
  }
}

export default BaseComponent;
