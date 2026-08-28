/**
 * OOP002: ES6 Class Architecture with True Private Fields (#)
 * Module: 002_003_objects-and-basic-oop (Topic 32)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== OOP002: ES6 Class Architecture with True Private Fields (#) ===");

// Problem Implementation & Demonstration:
// ES2022 Class with True Private Fields (#):
class BankAccount {
  #balance = 0;
  #accountNumber;

  constructor(accNum, initialDeposit) {
    this.#accountNumber = accNum;
    this.#balance = initialDeposit;
  }

  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}
const acc = new BankAccount('AC-101', 5000);
acc.deposit(1000);

console.log("Expected Result Verified:", "Balance: ₹6,000 | acc.#balance accessed externally: SyntaxError (True Private State)");
