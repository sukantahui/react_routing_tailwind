/**
 * File: OopVsProceduralFoundationsDemo.java
 * Module: 002_001_classes-objects-memory-and-encapsulation (Topic 0)
 * Description: Demonstrates the architectural shift from Procedural (C/Pascal style) to Object-Oriented Programming (OOP):
 *              1. Procedural approach: Unprotected global parallel arrays & decoupled functions
 *              2. Object-Oriented approach: Encapsulated entities bundling State (fields) & Behavior (methods)
 *              3. Domain modeling of Student & BankAccount accounts with deposit/withdrawal invariants
 *              for student tuition fee management at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.oop;

import java.util.Objects;

public class OopVsProceduralFoundationsDemo {

    // =========================================================================
    // 1. PROCEDURAL PARADIGM (Vulnerable, Decoupled, Prone to State Corruption)
    // =========================================================================
    public static class ProceduralBanking {
        // Global parallel arrays: Data is separated from behavior and globally exposed
        public static int[] accountNumbers = {1001, 1002, 1003};
        public static String[] accountHolders = {"Swadeep", "Tuhina", "Abhronila"};
        public static double[] balances = {25000.0, 35000.0, 18000.0};

        // Decoupled function modifying raw array state without encapsulation
        public static void deposit(int accountIndex, double amount) {
            if (amount > 0) {
                balances[accountIndex] += amount;
            }
        }

        // Flaw: Any external function can maliciously or accidentally corrupt state:
        // balances[0] = -999999.0; // Allowed! No encapsulation!
    }

    // =========================================================================
    // 2. OBJECT-ORIENTED PARADIGM (Encapsulated, Self-Protecting, Cohesive)
    // =========================================================================
    public static class BankAccount {
        // State (Fields) are private: Data Hiding
        private final int accountNumber;
        private final String accountHolderName;
        private double balanceInr;

        public BankAccount(int accountNumber, String accountHolderName, double initialBalance) {
            if (accountNumber <= 0) {
                throw new IllegalArgumentException("Account number must be positive");
            }
            this.accountNumber = accountNumber;
            this.accountHolderName = Objects.requireNonNull(accountHolderName, "Holder name cannot be null");
            if (initialBalance < 0.0) {
                throw new IllegalArgumentException("Initial balance cannot be negative");
            }
            this.balanceInr = initialBalance;
        }

        // Behavior (Methods) operate directly on encapsulated state:
        public void deposit(double amount) {
            if (amount <= 0.0) {
                throw new IllegalArgumentException("Deposit amount must be positive: ₹" + amount);
            }
            this.balanceInr += amount;
            System.out.printf("  [DEPOSIT] Deposited ₹%,.2f into Account #%d | New Balance: ₹%,.2f%n",
                    amount, this.accountNumber, this.balanceInr);
        }

        public boolean withdraw(double amount) {
            if (amount <= 0.0) {
                throw new IllegalArgumentException("Withdrawal amount must be positive: ₹" + amount);
            }
            if (amount > this.balanceInr) {
                System.out.printf("  [WITHDRAW FAILED] Insufficient balance for Account #%d (Requested: ₹%,.2f, Available: ₹%,.2f)%n",
                        this.accountNumber, amount, this.balanceInr);
                return false;
            }
            this.balanceInr -= amount;
            System.out.printf("  [WITHDRAW SUCCESS] Withdrew ₹%,.2f from Account #%d | Remaining Balance: ₹%,.2f%n",
                    amount, this.accountNumber, this.balanceInr);
            return true;
        }

        public int getAccountNumber() { return accountNumber; }
        public String getAccountHolderName() { return accountHolderName; }
        public double getBalanceInr() { return balanceInr; }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE SEGMENT 2: TOPIC 0 OOP VS PROCEDURAL");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("1. PROCEDURAL BANKING DEMONSTRATION:");
        System.out.printf("   Holder: %s | Account: #%d | Initial Balance: ₹%,.2f%n",
                ProceduralBanking.accountHolders[0],
                ProceduralBanking.accountNumbers[0],
                ProceduralBanking.balances[0]);
        ProceduralBanking.deposit(0, 5000.0);
        System.out.printf("   After Deposit -> Balance: ₹%,.2f%n", ProceduralBanking.balances[0]);
        System.out.println("   [RISK] Any external code can set 'balances[0] = -50000.0' corrupting state!\n");

        System.out.println("2. OBJECT-ORIENTED BANKING (ENCAPSULATED ENTITY):");
        BankAccount swadeepAccount = new BankAccount(1001, "Swadeep", 25000.0);
        BankAccount tuhinaAccount  = new BankAccount(1002, "Tuhina", 35000.0);

        swadeepAccount.deposit(5000.0);
        swadeepAccount.withdraw(12000.0);
        swadeepAccount.withdraw(50000.0); // Safe rejection!

        System.out.println("\n3. SUMMARY OF ENCAPSULATED ACCOUNTS:");
        System.out.printf("   • Account #%d (%s) : ₹%,.2f%n",
                swadeepAccount.getAccountNumber(), swadeepAccount.getAccountHolderName(), swadeepAccount.getBalanceInr());
        System.out.printf("   • Account #%d (%s) : ₹%,.2f%n%n",
                tuhinaAccount.getAccountNumber(), tuhinaAccount.getAccountHolderName(), tuhinaAccount.getBalanceInr());

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Procedural programming separates data from functions, exposing state to corruption.");
        System.out.println("2. OOP bundles State (fields) and Behavior (methods) into cohesive Class blueprints.");
        System.out.println("3. Private fields + public methods safeguard domain invariants (Data Hiding).");
        System.out.println("4. Welcome to Segment 2: Object-Oriented Programming Deep Dive!");
        System.out.println("================================================================================");
    }
}
