/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 5: Why Create Custom Exceptions: Domain Clarity & Semantic Business Signaling
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class WhyCustomExceptionsAreEssentialDemo {

    // ANTI-PATTERN: Generic RuntimeException with ambiguous message:
    public static void withdrawGeneric(double amount) {
        if (amount > 10000) {
            throw new RuntimeException("Error: Limit exceeded!"); // Vague! Callers cannot catch this specifically!
        }
    }

    // BEST PRACTICE: Semantic Custom Domain Exception:
    public static class DailyWithdrawalLimitExceededException extends RuntimeException {
        private final double requestedAmount;
        private final double maxDailyLimit;

        public DailyWithdrawalLimitExceededException(double requested, double limit) {
            super("Requested " + requested + " INR exceeds daily threshold of " + limit + " INR");
            this.requestedAmount = requested;
            this.maxDailyLimit = limit;
        }

        public double getRequestedAmount() { return requestedAmount; }
        public double getMaxDailyLimit() { return maxDailyLimit; }
    }

    public static void withdrawDomain(double amount) {
        if (amount > 10000) {
            throw new DailyWithdrawalLimitExceededException(amount, 10000);
        }
        System.out.println("  [SUCCESS] Withdrawn: " + amount + " INR");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: WHY CUSTOM EXCEPTIONS MATTER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The 3 Primary Benefits of Custom Exceptions:");
        System.out.println("  1. Semantic Clarity: The class name itself ('DailyWithdrawalLimitExceeded') explains the business failure.");
        System.out.println("  2. Targeted Catching: Callers can catch this specific error without catching all generic RuntimeExceptions.");
        System.out.println("  3. Domain Metadata: Carries structured fields (requested amount, limit, transaction ID) for automated recovery.");

        System.out.println("\n>>> 2. Catching and Inspecting Custom Exception:");
        try {
            withdrawDomain(25000);
        } catch (DailyWithdrawalLimitExceededException e) {
            System.out.println("  [BUSINESS REACTION] " + e.getMessage());
            System.out.println("  [AUDIT] Max Limit: " + e.getMaxDailyLimit() + " INR | Requested: " + e.getRequestedAmount() + " INR");
        }

        System.out.println("\n==========================================================================");
    }
}