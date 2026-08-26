/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 15: Real-World Modeling: BankAccount (Abstract & Concrete Methods)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class RealWorldBankAccountAbstractionDemo {

    public abstract static class BankAccount {
        protected String accountNumber;
        protected String accountHolder;
        protected double balance;

        public BankAccount(String accNum, String holder, double initialDeposit) {
            this.accountNumber = accNum;
            this.accountHolder = holder;
            this.balance = initialDeposit;
        }

        // Shared Concrete Method: Balance Check
        public double getBalance() { return balance; }

        // Shared Concrete Method: Transaction Logging
        public void logTransaction(String type, double amount) {
            System.out.printf("  [AUDIT LOG] Acc: %s | %s: ₹%.2f | New Balance: ₹%.2f\n",
                    accountNumber, type, amount, balance);
        }

        // ABSTRACT METHODS: Specialized banking logic
        public abstract void deposit(double amount);
        public abstract boolean withdraw(double amount);
    }

    public static class SavingsAccount extends BankAccount {
        private static final double MIN_BALANCE = 1000.0;

        public SavingsAccount(String accNum, String holder, double initialDeposit) {
            super(accNum, holder, initialDeposit);
        }

        @Override
        public void deposit(double amount) {
            balance += amount;
            logTransaction("DEPOSIT", amount);
        }

        @Override
        public boolean withdraw(double amount) {
            if (balance - amount >= MIN_BALANCE) {
                balance -= amount;
                logTransaction("WITHDRAWAL", amount);
                return true;
            } else {
                System.out.printf("  [REJECTED] Insufficient funds! Minimum balance of ₹%.2f must be maintained.\n", MIN_BALANCE);
                return false;
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: REAL-WORLD BANK ACCOUNT ABSTRACTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BankAccount acc = new SavingsAccount("SB-BKP-10029", "Swadeep Paul", 5000.0);
        System.out.println(">>> Initial Balance: ₹" + acc.getBalance());

        System.out.println("\n>>> 1. Depositing ₹3000:");
        acc.deposit(3000.0);

        System.out.println("\n>>> 2. Withdrawing ₹6500 (Valid):");
        acc.withdraw(6500.0);

        System.out.println("\n>>> 3. Withdrawing ₹1000 (Violates min balance ₹1000):");
        acc.withdraw(1000.0);

        System.out.println("\n==========================================================================");
    }
}