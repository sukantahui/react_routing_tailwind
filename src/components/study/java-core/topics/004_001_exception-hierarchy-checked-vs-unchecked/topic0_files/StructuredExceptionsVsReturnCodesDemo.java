/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 0: Structured Exception Handling vs Legacy Return-Code Checking
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class StructuredExceptionsVsReturnCodesDemo {

    // ANTI-PATTERN: The C-style Return Code Error Checking:
    public static int withdrawLegacy(int currentBalance, int amount) {
        if (amount <= 0) return -1; // Error code -1: Invalid amount
        if (amount > currentBalance) return -2; // Error code -2: Insufficient funds
        return currentBalance - amount; // Success: returns new balance (What if balance happens to be -1?)
    }

    // BEST PRACTICE: Structured Java Exception Handling:
    public static int withdrawStructured(int currentBalance, int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive! Received: " + amount);
        }
        if (amount > currentBalance) {
            throw new IllegalStateException("Insufficient funds! Balance: " + currentBalance + ", Requested: " + amount);
        }
        return currentBalance - amount;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: STRUCTURED EXCEPTION HANDLING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int balance = 5000;

        System.out.println(">>> 1. Legacy Return-Code Pitfalls (Errors can be silently ignored by callers):");
        int res = withdrawLegacy(balance, 10000);
        if (res == -2) {
            System.out.println("  [LEGACY] Error detected manually via if-check: Insufficient funds.");
        }

        System.out.println("\n>>> 2. Modern Structured Exception Handling (Errors CANNOT be ignored):");
        try {
            withdrawStructured(balance, 10000);
        } catch (IllegalStateException e) {
            System.out.println("  [STRUCTURED CATCH] " + e.getMessage());
        }

        System.out.println("\n>>> WHY STRUCTURED EXCEPTIONS WIN:");
        System.out.println("  1. Separation of Normal Business Logic from Error-Handling Code.");
        System.out.println("  2. Impossible to Silently Ignore: Unhandled errors bubble up and halt execution safely.");
        System.out.println("  3. Rich Diagnostic Context: Stack trace, error message, and exception type hierarchy.");

        System.out.println("\n==========================================================================");
    }
}