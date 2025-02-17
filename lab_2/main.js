import transactions from "./transactions.js";

const transactions_2 = [
  [
    {
      transaction_id: "2",
      transaction_date: "2019-01-02",
      transaction_amount: 50.0,
      transaction_type: "credit",
      transaction_description: "Refund for returned item",
      merchant_name: "OnlineShop",
      card_type: "MasterCard",
    },
  ],
];

const transactionsEmpty = [];

/**
 * Returns the month name given a number.
 * @param {number} monthNumber - A number in the range of 1 - 12.
 * @returns {string} The month name, or "Invalid month" if the number is out of range.
 */
const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthNumber - 1] || "Invalid month";
};

/**
 * Returns an array of unique transaction types from the provided transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {Array} An array of unique transaction types.
 */
const getUniqueTransactionTypes = (transactions) => [
  ...new Set(transactions[0]?.map((transaction) => transaction.transaction_type)),
];

/**
 * Calculates the total amount of all transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {number} The total amount of all transactions.
 */
const calculateTotalAmount = (transactions) =>
  transactions[0]?.reduce(
    (acc, transaction) => (acc += transaction.transaction_amount),
    0
  );

/**
 * Calculates the total amount of all transactions in a given date range.
 * @param {Array} transactions - An array of transaction objects.
 * @param {number} [year] - The year to filter by. If not specified, all years are included.
 * @param {number} [month] - The month to filter by. If not specified, all months are included.
 * @param {number} [day] - The day to filter by. If not specified, all days are included.
 * @returns {number} The total amount of all transactions in the given date range.
 */
const calculateTotalAmountByDate = (
  transactions,
  year = null,
  month = null,
  day = null
) => {
  return transactions[0]?.reduce((totalAmount, transaction) => {
    const transactionFullDate = new Date(transaction.transaction_date);
    const transactionYear = transactionFullDate.getFullYear();
    const transactionMonth = transactionFullDate.getMonth() + 1;
    const transactionDay = transactionFullDate.getDate();

    if (
      (year === null || transactionYear === year) &&
      (month === null || transactionMonth === month) &&
      (day === null || transactionDay === day)
    ) {
      return totalAmount + transaction.transaction_amount;
    }

    return totalAmount;
  }, 0);
};

/**
 * Returns an array filtered by transaction type.
 * @param {Array} transactions - An array of transaction objects.
 * @param {string} type - The transaction type debit or credit.
 * @returns {Array} An array of filtered transactions by type param.
 */
const getTransactionByType = (transactions, type) =>
  transactions[0]?.filter((transaction) => transaction.transaction_type === type);

/**
 * Returns an array filtered between startDate and endDate params.
 * @param {Array} transactions - An array of transaction objects.
 * @param {string} startDate - Start date to filter by transaction in string format e.g. (2019-01-01).
 * @param {string} endDate - End date to filter by transaction in string format e.g. (2019-02-01).
 * @returns {Array} An array filtered in date range.
 */
const getTransactionsInDateRange = (transactions, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return transactions[0]?.filter((transaction) => {
    const transactionFullDate = new Date(transaction.transaction_date);

    return transactionFullDate >= start && transactionFullDate <= end;
  });
};

/**
 * Returns an array filtered by merchant name.
 * @param {Array} transactions - An array of transaction objects.
 * @param {string} merchantName - The merchant name to filter by.
 * @returns {Array} An array filtered by merchant name.
 */
const getTransactionsByMerchant = (transactions, merchantName) =>
  transactions[0]?.filter(
    (transaction) => transaction.merchant_name === merchantName
  );

/**
 * Calculates the average transaction amount from an array of transaction objects.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {number} The average transaction amount.
 */
const calculateAverageTransactionAmount = (transactions) =>
  calculateTotalAmount(transactions) / transactions[0]?.length;

/**
 * Returns an array filtered by transaction amount range.
 * @param {Array} transactions - An array of transaction objects.
 * @param {number} minAmount - The minimum amount to filter by.
 * @param {number} maxAmount - The maximum amount to filter by.
 * @returns {Array} An array filtered by transaction amount range.
 */
const getTransactionsByAmountRange = (transactions, minAmount, maxAmount) =>
  transactions[0]?.filter(
    (transaction) =>
      transaction.transaction_amount >= minAmount &&
      transaction.transaction_amount <= maxAmount
  );

/**
 * Calculates the total amount of all debit transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {number} The total amount of all debit transactions.
 */

const calculateTotalDebitAmount = (transactions) =>
  transactions[0]?.reduce((acc, transaction) => {
    if (transaction.transaction_type === "debit") {
      acc += transaction.transaction_amount;
      return acc;
    } else {
      return acc;
    }
  }, 0);

/**
 * Finds the month with the most transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {string} The month with the most transactions, as a string (e.g. "January").
 */

const findMostTransactionsMonth = (transactions) => {
  const transactionsPerMonth = {};

  transactions[0]?.forEach((transaction) => {
    const transactionMonth = new Date(transaction.transaction_date).getMonth() + 1;
    transactionsPerMonth[transactionMonth]
      ? transactionsPerMonth[transactionMonth]++
      : (transactionsPerMonth[transactionMonth] = 1);
  });

  const maxCountTransactionsPerMonth = Math.max(
    ...Object.values(transactionsPerMonth)
  );
  const mostTransactionsMonthNumber = Object.keys(transactionsPerMonth).find(
    (month) => transactionsPerMonth[month] === maxCountTransactionsPerMonth
  );

  return getMonthName(mostTransactionsMonthNumber);
};

/**
 * Finds the month with the most debit transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {string} The month with the most debit transactions, as a string (e.g., "January").
 */
const findMostDebitTransactionMonth = (transactions) => {
  const debitTransactionsPerMonth = {};

  transactions[0]?.forEach((transaction) => {
    const isDebitTransaction = transaction.transaction_type === "debit";
    const transactionMonth = new Date(transaction.transaction_date).getMonth() + 1;

    isDebitTransaction
      ? debitTransactionsPerMonth[transactionMonth]++
      : (debitTransactionsPerMonth[transactionMonth] = 1);
  });

  const maxCountTransactionsPerMonth = Math.max(
    ...Object.values(debitTransactionsPerMonth)
  );
  const mostTransactionsMonthNumber = Object.keys(debitTransactionsPerMonth).find(
    (month) => debitTransactionsPerMonth[month] === maxCountTransactionsPerMonth
  );

  return getMonthName(mostTransactionsMonthNumber);
};

/**
 * Finds the most common transaction type ("credit" or "debit") in the given transactions.
 * If the counts are equal, returns "equal".
 * @param {Array} transactions - An array of transaction objects.
 * @returns {string} The most common transaction type.
 */
const mostTransactionTypes = (transactions) => {
  let [creditCount, debitCount] = [0, 0];

  transactions[0]?.forEach((transaction) => {
    transaction.transaction_type === "credit" ? ++creditCount : ++debitCount;
  });

  return creditCount > debitCount
    ? "credit"
    : creditCount < debitCount
    ? "debit"
    : "equal";
};

/**
 * Returns an array of transactions that occurred on or before the given date.
 * @param {Array} transactions - An array of transaction objects.
 * @param {string} date - The date to filter transactions by, in string format (e.g., "2019-01-01").
 * @returns {Array} An array of transactions that occurred on or before the given date.
 */

const getTransactionsBeforeDate = (transactions, date) => {
  return transactions[0]?.filter((transaction) => {
    const transactionFullDate = new Date(transaction.transaction_date);

    return transactionFullDate <= new Date(date);
  });
};

/**
 * Finds a transaction by its ID in the given transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @param {string|number} id - The ID of the transaction to find.
 * @returns {?Object} The transaction with the given ID if found, or null if not.
 */
const findTransactionById = (transactions, id) =>
  transactions[0]?.find(
    (transaction) => String(transaction.transaction_id) === String(id)
  );

/**
 * Maps transaction descriptions from transaction array.
 * @param {array} transactions - Transaction array.
 * @returns {array} An array of transaction descriptions.
 */
const mapTransactionDescriptions = (transactions) =>
  transactions[0]?.map((transaction) => transaction.transaction_description);

// Test functions with given data.
console.warn("Test functions with given data.");

console.log("Unique Transaction Types:", getUniqueTransactionTypes(transactions));
console.log(
  'Transactions by Type "debit":',
  getTransactionByType(transactions, "debit" /* "credit" */)
);
console.log(
  'Transactions by Merchant "SuperMart":',
  getTransactionsByMerchant(transactions, "SuperMart")
);
console.log("Total Transactions amount:", calculateTotalAmount(transactions));
console.log(
  "Average Transaction Amount:",
  calculateAverageTransactionAmount(transactions)
);
console.log(
  "Transactions in Amount Range -10 to 50:",
  getTransactionsByAmountRange(transactions, -10, 50)
);
console.log("Total Debit Amount:", calculateTotalDebitAmount(transactions));
console.log(
  "Most Frequent Transaction Types:",
  mostTransactionTypes(transactions)
);
console.log("Transaction by ID 100:", findTransactionById(transactions, 100));
console.log("Transaction Descriptions:", mapTransactionDescriptions(transactions));

console.log(
  "Total Amount by Date (15th):",
  calculateTotalAmountByDate(transactions, null, null, 15)
);
console.log(
  "Transactions in Date Range 2019-01-01 to 2019-01-30:",
  getTransactionsInDateRange(transactions, "2019-01-01", "2019-01-30")
);
console.log(
  "Most Frequent Transaction Month:",
  findMostTransactionsMonth(transactions)
);
console.log(
  "Most Debit Transactions Month:",
  findMostDebitTransactionMonth(transactions)
);
console.log(
  'Transactions Before Date "2019-03-01":',
  getTransactionsBeforeDate(transactions, "2019-03-01")
);

// Test functions with 1 record.
console.warn("Test functions with 1 record");

console.log(
  "Unique Transaction Types:",
  getUniqueTransactionTypes(transactions_2)
);
console.log(
  'Transactions by Type "credit":',
  getTransactionByType(transactions_2, "credit")
);
console.log(
  'Transactions by Merchant "OnlineShop":',
  getTransactionsByMerchant(transactions_2, "OnlineShop")
);
console.log("Total Transactions amount:", calculateTotalAmount(transactions_2));
console.log(
  "Average Transaction Amount:",
  calculateAverageTransactionAmount(transactions_2)
);
console.log(
  "Transactions in Amount Range -10 to 50:",
  getTransactionsByAmountRange(transactions_2, -10, 50)
);
console.log("Total Debit Amount:", calculateTotalDebitAmount(transactions_2));
console.log(
  "Most Frequent Transaction Types:",
  mostTransactionTypes(transactions_2)
);
console.log("Transaction by ID 100:", findTransactionById(transactions_2, 100));
console.log(
  "Transaction Descriptions:",
  mapTransactionDescriptions(transactions_2)
);

console.log(
  "Total Amount by Date (15th):",
  calculateTotalAmountByDate(transactions_2, null, null, 15)
);
console.log(
  "Transactions in Date Range 2019-01-01 to 2019-01-30:",
  getTransactionsInDateRange(transactions_2, "2019-01-01", "2019-01-30")
);
console.log(
  "Most Frequent Transaction Month:",
  findMostTransactionsMonth(transactions_2)
);
console.log(
  "Most Debit Transactions Month:",
  findMostDebitTransactionMonth(transactions_2)
);
console.log(
  'Transactions Before Date "2019-03-01":',
  getTransactionsBeforeDate(transactions_2, "2019-03-01")
);

// Test functions with an empty array.
console.warn("Test functions with an empty array");

console.log(
  "Unique Transaction Types (Empty):",
  getUniqueTransactionTypes(transactionsEmpty)
);
console.log(
  'Transactions by Type "credit" (Empty):',
  getTransactionByType(transactionsEmpty, "credit")
);
console.log(
  'Transactions by Merchant "OnlineShop" (Empty):',
  getTransactionsByMerchant(transactionsEmpty, "OnlineShop")
);
console.log("Total Transactions amount:", calculateTotalAmount(transactionsEmpty));
console.log(
  "Average Transaction Amount (Empty):",
  calculateAverageTransactionAmount(transactionsEmpty)
);
console.log(
  "Transactions in Amount Range -10 to 50 (Empty):",
  getTransactionsByAmountRange(transactionsEmpty, -10, 50)
);
console.log(
  "Total Debit Amount (Empty):",
  calculateTotalDebitAmount(transactionsEmpty)
);
console.log(
  "Most Frequent Transaction Types (Empty):",
  mostTransactionTypes(transactionsEmpty)
);
console.log(
  "Transaction by ID 100 (Empty):",
  findTransactionById(transactionsEmpty, 100)
);
console.log(
  "Transaction Descriptions (Empty):",
  mapTransactionDescriptions(transactionsEmpty)
);

console.log(
  "Total Amount by Date (15th, Empty):",
  calculateTotalAmountByDate(transactionsEmpty, null, null, 15)
);
console.log(
  "Transactions in Date Range 2019-01-01 to 2019-01-30 (Empty):",
  getTransactionsInDateRange(transactionsEmpty, "2019-01-01", "2019-01-30")
);
console.log(
  "Most Frequent Transaction Month (Empty):",
  findMostTransactionsMonth(transactionsEmpty)
);
console.log(
  "Most Debit Transactions Month (Empty):",
  findMostDebitTransactionMonth(transactionsEmpty)
);
console.log(
  'Transactions Before Date "2019-03-01" (Empty):',
  getTransactionsBeforeDate(transactionsEmpty, "2019-03-01")
);
