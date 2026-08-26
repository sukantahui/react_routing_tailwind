const topic15_questions = [
  {
    question: "How does the BankAccount abstract hierarchy model partial abstraction in enterprise banking applications?",
    shortAnswer: "The abstract 'BankAccount' encapsulates common state (accountNumber, balance) and universal behavior (getBalance, logTransaction), while leaving variable business rules (deposit and withdraw logic with interest or overdraft checks) as abstract methods for Savings, Current, and FixedDeposit accounts.",
    explanation: "Provides high code reuse while enforcing strict domain-specific withdrawal invariants.",
    hint: "Universal logging/balance shared; custom withdrawal rules left abstract.",
    level: "Intermediate",
    codeExample: "// SavingsAccount vs CurrentAccount withdrawal rules"
  }
];

export default topic15_questions;