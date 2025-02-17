# Лабораторная работа по JavaScript № 3

## Работа с классами в JavaScript.

## Запуск проекта: 
- Открыть в любой IDE и запустить локальный сервер.
- В браузере открыть Dev Tools -> Консоль и увидеть результат.

### Примеры использования проекта с приложением скриншотов или фрагментов кода:

#### 1. Подключаем в html главный скрипт `script.js`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./script.js"></script>
  </head>
  <body></body>
</html>
```

#### 2. Создаём класс `Item`, который будет представлять предмет в инвентаре:

Поля класса:

- `name` – название предмета.

- `weight` – вес предмета.

- `rarity` – редкость предмета (common, uncommon, rare, legendary).

```javascript
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }
```

Создаём методы:
- `getInfo()` – возвращает строку с информацией о предмете.

- `setWeight(newWeight)` – изменяет вес предмета.

```javascript
getInfo() {
  return `Info about item: name - ${this.name},
  weight - ${this.weight}, rarity - ${this.rarity}`;
};

setWeight = (newWeight) => {
  this.weight = newWeight;
};
```

Пример использования:
```javascript
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword?.getInfo());  // Info about item: name - Steel Sword, weight - 3.5, rarity - rare
sword.setWeight(100.4);
console.log(sword.getInfo());  // Info about item: name - Steel Sword, weight - 100.4, rarity - rare
```

#### 3. Создаём класс `Weapon`, который будет наследоваться от класса `Item` и представлять оружие в игре.

Дополнительные поля:
- `damage` – урон оружия. 

- `durability` – прочность (от 0 до 100).

```javascript
class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }
```

Методы:
- `use()` – уменьшает `durability` на 10 (если `durability` > 0).

- `repair()` – восстанавливает `durability` до 100.

```javascript
repair = () => {
  this.durability = 100;
};

getInfo() {
  const itemInfo = super.getInfo();
  return `${itemInfo}, damage - ${this.damage}, durability - ${this.durability}`;
};
```

Пример использования:

```javascript
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow?.getInfo()); // Info about item: name - Longbow, weight - 2, rarity - uncommon, damage - 15, durability - 100
bow.use();
console.log(bow.durability); // 90
bow.repair();
bow.setWeight(599);
console.log(bow.getInfo()); // Info about item: name - Longbow, weight - 599, rarity - uncommon, damage - 15, durability - 100
```

### Ответы на вопросы:

1. Какое значение имеет `this` в методах класса?

    В методах класса `this` ссылается на экземпляр этого класса:

    ```javascript
    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(`Hello, my name is ${this.name}`);
      }
    }

    const user = new User("Alice");
    user.sayHello(); // Hello, my name is Alice
    ```

2. Как работает модификатор доступа `#`?

    Модификатор `#` делает поле или метод класса приватными, то есть недоступными за пределами класса.

    ```javascript
    class User {
      #password;

      constructor(name, password) {
        this.name = name;
        this.#password = password;
      }

      #encryptPassword() {
        return `###${this.#password}###`; // Приватный метод
      }

        getPasswordHash() {
          return this.#encryptPassword();
      }
    }

    const user = new User("Alice", "12345");
    console.log(user.name); // "Alice"
    console.log(user.getPasswordHash()); // ###12345###
    console.log(user.#password); // Ошибка: Private field '#password' must be declared in an enclosing class
    ```

3. В чем разница между классами и функциями-конструкторами?

    Классы являются синтаксическим сахаром над функциями-конструкторами, но при этом они читаемее, поддерживают `super`, наследование и приватные свойства.

    ```javascript
    function User(name) {
      this.name = name;
    }

    User.prototype.sayHello = function () {
      console.log(`Hello, my name is ${this.name}`);
    };

    const user = new User("Alice");
    user.sayHello(); // Hello, my name is Alice
    ```
## Список использованных источников:
https://developer.mozilla.org/ru/
https://www.w3schools.com/js/
https://learn.javascript.ru/