/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 10: Real-World Enterprise Custom Exceptions Catalog (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

// 1. UserNotFoundException (HTTP 404 Equivalent):
class UserNotFoundException extends RuntimeException {
    private final String userId;
    public UserNotFoundException(String userId) {
        super("User with ID '" + userId + "' was not found in Barrackpore registry.");
        this.userId = userId;
    }
    public String getUserId() { return userId; }
}

// 2. InsufficientBalanceException (Business Rule Violation):
class InsufficientBalanceException extends Exception {
    private final double currentBalance;
    private final double requestedAmount;
    public InsufficientBalanceException(double current, double requested) {
        super(String.format("Insufficient funds! Current: %.2f INR, Requested: %.2f INR", current, requested));
        this.currentBalance = current;
        this.requestedAmount = requested;
    }
    public double getShortfall() { return requestedAmount - currentBalance; }
}

// 3. DuplicateAccountException (HTTP 409 Conflict):
class DuplicateAccountException extends RuntimeException {
    public DuplicateAccountException(String email) {
        super("An account already exists with email: " + email);
    }
}

public class EnterpriseCustomExceptionsCatalogCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: ENTERPRISE CUSTOM EXCEPTIONS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Simulating UserNotFoundException:");
        try {
            throw new UserNotFoundException("USR_BKP_1092");
        } catch (UserNotFoundException e) {
            System.out.println("  [NOT FOUND HANDLER] " + e.getMessage() + " (User: " + e.getUserId() + ")");
        }

        System.out.println("\n>>> 2. Simulating InsufficientBalanceException (Checked):");
        try {
            throw new InsufficientBalanceException(2500.0, 6000.0);
        } catch (InsufficientBalanceException e) {
            System.out.println("  [PAYMENT HANDLER] " + e.getMessage());
            System.out.println("  [ACTION] Prompt student to deposit shortfall: " + e.getShortfall() + " INR");
        }

        System.out.println("\n>>> 3. Simulating DuplicateAccountException:");
        try {
            throw new DuplicateAccountException("swadeep.paul@coderaccotax.com");
        } catch (DuplicateAccountException e) {
            System.out.println("  [CONFLICT HANDLER] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 004_003 THROW, THROWS & CUSTOM EXCEPTIONS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}