/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 10: Encapsulation Principle: Bundling Data and Methods into a Single Unit
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The Capsule & The Invariant Fortress
 * ----------------------------------------------------------------------------
 * 1. What is Encapsulation?
 *    - The foundational Object-Oriented principle of bundling state (fields) and
 *      the behaviors (methods) that operate on that state into a single cohesive unit (Class).
 *    - It establishes a protective boundary (the "Capsule Shell") that prevents
 *      direct external access to internal data, exposing only a controlled, validated
 *      public API.
 *
 * 2. The Two Core Pillars of Encapsulation:
 *    - Pillar 1: Bundling (Data + Code in one entity).
 *    - Pillar 2: Data Hiding & Guarded Invariants (Restricting direct field access).
 *
 * 3. What is a Class Invariant?
 *    - A condition or business rule that must hold true for the object at all times
 *      (e.g., "Account balance cannot be negative", "Student marks must be 0 to 100",
 *      "Account number cannot change once created").
 *    - Encapsulation ensures that only the class's own methods can mutate state,
 *      guaranteeing that invariants can never be violated by outside code.
 *
 * 4. Architectural Benefits:
 *    - Maintainability : Internal implementation details can change without breaking client code.
 *    - Security & Safety: Invalid, corrupted, or malicious values are rejected at the gate.
 *    - Auditability    : All state mutations can be logged, validated, and monitored centrally.
 *    - Loose Coupling  : Clients interact with contracts (methods), not physical field layouts.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class EncapsulationPrincipleDemo {

    // ------------------------------------------------------------------------
    // Part 1: THE BAD APPROACH - Unencapsulated Class (Public Fields)
    // ------------------------------------------------------------------------
    public static class UnencapsulatedStudentAccount {
        // Vulnerable: Any outside class can directly overwrite these fields!
        public int accountId;
        public String studentName;
        public double balanceInr;
        public String branch;

        public UnencapsulatedStudentAccount(int accountId, String studentName, double balanceInr, String branch) {
            this.accountId = accountId;
            this.studentName = studentName;
            this.balanceInr = balanceInr;
            this.branch = branch;
        }
    }

    // ------------------------------------------------------------------------
    // Part 2: THE GOOD APPROACH - Well-Encapsulated Domain Entity (Capsule)
    // ------------------------------------------------------------------------
    public static class EncapsulatedStudentAccount {

        // --- 1. Private Internal State (Hidden Data) ---
        private final int accountId;                 // Immutable identifier
        private String studentName;                  // Guarded mutable state
        private final String campusBranch;           // Immutable campus location
        private double balanceInr;                   // Guarded financial balance (Invariant: balance >= 0)
        private final List<String> transactionAuditLog; // Encapsulated collection

        // --- 2. Guarded Constructor (Establishes Initial Invariants) ---
        public EncapsulatedStudentAccount(int accountId, String studentName, String campusBranch, double initialDepositInr) {
            if (accountId <= 0) {
                throw new IllegalArgumentException("Account ID must be strictly positive.");
            }
            if (studentName == null || studentName.trim().isEmpty()) {
                throw new IllegalArgumentException("Student name cannot be null or blank.");
            }
            if (campusBranch == null || campusBranch.trim().isEmpty()) {
                throw new IllegalArgumentException("Campus branch is mandatory.");
            }
            if (initialDepositInr < 0.0) {
                throw new IllegalArgumentException("Initial deposit cannot be negative.");
            }

            this.accountId = accountId;
            this.studentName = studentName.trim();
            this.campusBranch = campusBranch.trim();
            this.balanceInr = initialDepositInr;
            this.transactionAuditLog = new ArrayList<>();

            recordAuditEntry("Account opened with initial deposit: ₹" + String.format("%.2f", initialDepositInr));
        }

        // --- 3. Guarded Mutator Methods (Preserving Invariants) ---
        public boolean depositStipend(double amountInr, String sourceDescription) {
            if (amountInr <= 0.0) {
                System.out.println("  [Deposit REJECTED] Deposit amount must be positive. Attempted: ₹" + amountInr);
                return false;
            }
            this.balanceInr += amountInr;
            recordAuditEntry("Deposit (+): ₹" + String.format("%.2f", amountInr) + " from " + sourceDescription);
            System.out.printf("  [Deposit Confirmed] ₹%,.2f credited to %s | New Balance: ₹%,.2f\n",
                    amountInr, this.studentName, this.balanceInr);
            return true;
        }

        public boolean withdrawFunds(double amountInr, String purpose) {
            if (amountInr <= 0.0) {
                System.out.println("  [Withdrawal REJECTED] Amount must be positive.");
                return false;
            }
            // Domain Invariant: Balance cannot drop below 0
            if (amountInr > this.balanceInr) {
                System.out.printf("  [Withdrawal REJECTED] Invariant Guard: Insufficient balance! Requested: ₹%,.2f | Available: ₹%,.2f\n",
                        amountInr, this.balanceInr);
                return false;
            }
            this.balanceInr -= amountInr;
            recordAuditEntry("Withdrawal (-): ₹" + String.format("%.2f", amountInr) + " for " + purpose);
            System.out.printf("  [Withdrawal Approved] ₹%,.2f debited for %s (%s) | Remaining Balance: ₹%,.2f\n",
                    amountInr, this.studentName, purpose, this.balanceInr);
            return true;
        }

        public void updateStudentName(String newName) {
            if (newName == null || newName.trim().isEmpty()) {
                System.out.println("  [Update Rejected] Name cannot be blank.");
                return;
            }
            String oldName = this.studentName;
            this.studentName = newName.trim();
            recordAuditEntry("Name updated from '" + oldName + "' to '" + this.studentName + "'");
        }

        // --- 4. Controlled Accessors (Safe Data Exposure) ---
        public int getAccountId() { return accountId; }
        public String getStudentName() { return studentName; }
        public String getCampusBranch() { return campusBranch; }
        public double getBalanceInr() { return balanceInr; }

        // Defensive copy / unmodifiable view of internal collection
        public List<String> getTransactionAuditLog() {
            return Collections.unmodifiableList(this.transactionAuditLog);
        }

        // --- 5. Internal Private Helper (Implementation Detail Hidden) ---
        private void recordAuditEntry(String description) {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MMM HH:mm:ss");
            String timestamp = LocalDateTime.now().format(dtf);
            this.transactionAuditLog.add("[" + timestamp + "] " + description);
        }

        public void printAccountSummary() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | Account ID      : ACC-%05d                                |\n", accountId);
            System.out.printf("  | Account Holder  : %-42s |\n", studentName);
            System.out.printf("  | Campus Branch   : %-42s |\n", campusBranch);
            System.out.printf("  | Secured Balance : ₹%-42.2f |\n", balanceInr);
            System.out.printf("  | Audit Log Items : %-42d |\n", transactionAuditLog.size());
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Demonstrating the Power of Encapsulation vs Corruption
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: THE ENCAPSULATION PRINCIPLE & INVARIANT GUARDS");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: The Vulnerability of Unencapsulated Code
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: The Danger of Unencapsulated Classes (Direct Field Access)");
        UnencapsulatedStudentAccount brokenAccount = new UnencapsulatedStudentAccount(
                101, "Swadeep Paul", 5000.00, "Barrackpore"
        );

        System.out.println("  Initial Balance: ₹" + brokenAccount.balanceInr);
        System.out.println("  Malicious or buggy external code executes: brokenAccount.balanceInr = -99999.00;");
        brokenAccount.balanceInr = -99999.00; // Directly corrupted! No validation, no audit log!
        brokenAccount.studentName = "";        // Invalid empty name!
        brokenAccount.accountId = -55;         // Corrupted primary key!

        System.out.println("  [CORRUPTED STATE] Account ID: " + brokenAccount.accountId
                + " | Name: '" + brokenAccount.studentName + "' | Balance: ₹" + brokenAccount.balanceInr);
        System.out.println("  Result: System integrity is completely destroyed because data is unprotected!\n");

        // --------------------------------------------------------------------
        // DEMO 2: The Safety of Well-Encapsulated Classes
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 2: The Fortress of Encapsulation (Guarded Invariants)");
        EncapsulatedStudentAccount secureAccount = new EncapsulatedStudentAccount(
                1001, "Swadeep Paul", "Barrackpore Academy", 12000.00
        );

        secureAccount.printAccountSummary();

        System.out.println("\nExecuting guarded business behaviors through public API:");
        secureAccount.depositStipend(5500.00, "State Merit Scholarship");
        secureAccount.withdrawFunds(3200.00, "Java Certification Exam Voucher");

        // Attempting an illegal operation that violates the invariant
        System.out.println("\nAttempting illegal withdrawal of ₹50,000 (Exceeds available balance):");
        secureAccount.withdrawFunds(50000.00, "Luxury Vacation");

        // Attempting illegal negative deposit
        System.out.println("\nAttempting illegal negative deposit of -₹5,000:");
        secureAccount.depositStipend(-5000.00, "Corrupt Credit");

        secureAccount.printAccountSummary();

        // --------------------------------------------------------------------
        // DEMO 3: Inspecting Encapsulated Audit Log (Immutable View)
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Verifying Encapsulated Audit Trail (Defensive Collection)");
        System.out.println("Transaction History recorded automatically inside the capsule:");
        for (String entry : secureAccount.getTransactionAuditLog()) {
            System.out.println("    " + entry);
        }

        System.out.println("\nTesting immutability of audit log view (Attempting to clear externally):");
        try {
            secureAccount.getTransactionAuditLog().clear();
        } catch (UnsupportedOperationException uoe) {
            System.out.println("  [SECURITY GUARD] External attempt to tamper with audit log REJECTED! (UnsupportedOperationException)");
        }

        System.out.println("\n==========================================================================");
        System.out.println(" ENCAPSULATION PRINCIPLE DEMONSTRATION COMPLETE - BARRACKPORE");
        System.out.println("==========================================================================");
    }
}
