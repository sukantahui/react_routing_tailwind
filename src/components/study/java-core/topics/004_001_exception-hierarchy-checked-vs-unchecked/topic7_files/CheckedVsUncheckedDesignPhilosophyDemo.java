/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 7: Enterprise Design Philosophy: When to Choose Checked vs Unchecked Exceptions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class CheckedVsUncheckedDesignPhilosophyDemo {

    // 1. CHECKED EXCEPTION: The caller CAN and SHOULD reasonably recover from this external failure:
    public static class InsufficientBalanceException extends Exception {
        private final double shortfall;
        public InsufficientBalanceException(String msg, double shortfall) {
            super(msg);
            this.shortfall = shortfall;
        }
        public double getShortfall() { return shortfall; }
    }

    // 2. UNCHECKED EXCEPTION: Represents a programming violation / precondition failure:
    public static class InvalidAccountStateException extends RuntimeException {
        public InvalidAccountStateException(String msg) {
            super(msg);
        }
    }

    public static void executeTransfer(boolean isAccountActive, double balance, double transferAmount)
            throws InsufficientBalanceException {
        // Precondition check (Programmer error -> Unchecked):
        if (!isAccountActive) {
            throw new InvalidAccountStateException("Account is suspended or closed! Cannot initiate transfer.");
        }

        // Business condition (Recoverable business failure -> Checked):
        if (transferAmount > balance) {
            throw new InsufficientBalanceException("Insufficient funds in account", transferAmount - balance);
        }

        System.out.println("  [SUCCESS] Transferred " + transferAmount + " INR successfully.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CHECKED vs UNCHECKED DESIGN PHILOSOPHY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The Golden Rule of Exception Design (Effective Java Item 70):");
        System.out.println("  - Use CHECKED exceptions for recoverable business conditions (e.g. InsufficientBalance).");
        System.out.println("  - Use UNCHECKED (RuntimeException) for programming errors or invalid preconditions (e.g. AccountSuspended).");

        System.out.println("\n>>> Executing Transfer Simulation:");
        try {
            executeTransfer(true, 5000.0, 7500.0);
        } catch (InsufficientBalanceException e) {
            System.out.println("  [BUSINESS RECOVERY] Prompt customer to deposit shortfall of: " + e.getShortfall() + " INR");
        }

        System.out.println("\n==========================================================================");
    }
}