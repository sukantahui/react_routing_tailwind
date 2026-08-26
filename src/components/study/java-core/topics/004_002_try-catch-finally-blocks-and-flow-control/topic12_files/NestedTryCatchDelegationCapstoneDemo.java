/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 12: Nested try-catch Blocks & Multi-Tier Exception Handling Delegation (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class NestedTryCatchDelegationCapstoneDemo {

    public static void executeTwoTierProcessing(String rawNumber, int divisor) {
        System.out.println("  [OUTER ENTRY] Starting outer financial calculation tier...");

        // OUTER TRY BLOCK: Handles broad system-level lifecycle
        try {
            int baseAmount = 10000;

            // INNER TRY BLOCK 1: Specialized in parsing numbers
            int parsedFactor = 1;
            try {
                System.out.println("    [INNER TIER 1] Parsing input string: '" + rawNumber + "'");
                parsedFactor = Integer.parseInt(rawNumber);
            } catch (NumberFormatException nfe) {
                System.out.println("    [INNER RECOVERY 1] Invalid number format! Defaulted factor to 1.");
                parsedFactor = 1;
            }

            // INNER TRY BLOCK 2: Specialized in arithmetic division
            try {
                System.out.println("    [INNER TIER 2] Dividing base amount by: " + divisor);
                int share = baseAmount / divisor;
                System.out.println("    [INNER TIER 2 SUCCESS] Share per student: " + (share * parsedFactor) + " INR");
            } catch (ArithmeticException ae) {
                System.out.println("    [INNER RECOVERY 2] Cannot divide by zero divisor!");
                // Re-throwing to delegate to outer block:
                throw new IllegalStateException("Calculation aborted due to zero divisor", ae);
            }

        } catch (IllegalStateException outerEx) {
            System.out.println("  [OUTER CATCH] Outer supervisor caught delegated error: " + outerEx.getMessage());
            System.out.println("  [OUTER ROOT CAUSE] " + outerEx.getCause());
        } finally {
            System.out.println("  [OUTER FINALLY] Multi-tier audit ledger closed.\n");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: NESTED try-catch DELEGATION CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> RUN 1: Inner local recovery (Number parsed with fallback):");
        executeTwoTierProcessing("invalid_str", 5);

        System.out.println(">>> RUN 2: Inner-to-outer delegation (Arithmetic error escalated):");
        executeTwoTierProcessing("2", 0);

        System.out.println("==========================================================================");
        System.out.println(" MODULE 004_002 TRY, CATCH, FINALLY & FLOW CONTROL 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}