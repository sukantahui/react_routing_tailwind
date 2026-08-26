/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 5: L - Liskov Substitution Principle (LSP): Behavioral Subtyping
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class LiskovSubstitutionPrincipleDemo {

    // BASE CONTRACT: Guarantees deposit and withdraw semantics
    public static class BankAccount {
        protected double balance;
        public BankAccount(double initial) { this.balance = initial; }

        public void deposit(double amount) { balance += amount; }
        public void withdraw(double amount) {
            if (amount <= balance) balance -= amount;
        }
        public double getBalance() { return balance; }
    }

    // LSP COMPLIANT SUBTYPE: Fulfills all base expectations
    public static class SavingsAccount extends BankAccount {
        public SavingsAccount(double initial) { super(initial); }
        // Inherits valid withdraw without altering preconditions or throwing unexpected exceptions!
    }

    // LSP VIOLATION EXAMPLE: Subclass throwing UnsupportedOperationException breaks callers!
    public static class FixedDepositAccount extends BankAccount {
        public FixedDepositAccount(double initial) { super(initial); }

        @Override
        public void withdraw(double amount) {
            // VIOLATION: Caller expecting BankAccount cannot safely substitute FixedDepositAccount!
            throw new UnsupportedOperationException("Fixed Deposits cannot be withdrawn before maturity!");
        }
    }

    public static void executeBankingWorkflow(BankAccount acc) {
        System.out.println("  Initial Balance: ₹" + acc.getBalance());
        acc.deposit(5000.0);
        acc.withdraw(2000.0); // If acc is FixedDepositAccount, this CRASHES!
        System.out.println("  Final Balance  : ₹" + acc.getBalance());
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: LISKOV SUBSTITUTION PRINCIPLE (LSP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Testing Valid LSP Subtype (SavingsAccount):");
        executeBankingWorkflow(new SavingsAccount(10000.0));

        System.out.println("\n>>> 2. LSP Rule (Barbara Liskov):");
        System.out.println("  - Subtypes must be substitutable for their base types without altering correctness.");
        System.out.println("  - Never throw unexpected runtime exceptions for inherited methods!");

        System.out.println("\n==========================================================================");
    }
}