/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 7: The 'Swallow and Ignore' Anti-Pattern: Silent Data Corruption & Empty Catches
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class SwallowAndIgnoreAntiPatternDemo {

    // CATASTROPHIC ANTI-PATTERN: Empty Catch Block (Swallowing exceptions):
    public static void processTraineeFeePayment(String studentName, int amount) {
        try {
            // Risky financial operation:
            if (amount < 0) {
                throw new IllegalArgumentException("Negative payment amount: " + amount);
            }
            System.out.println("  [PAID] Processed " + amount + " INR for " + studentName);
        } catch (Exception e) {
            // EMPTY CATCH BLOCK: The exception is swallowed in total silence!
            // No logging, no rethrowing, no user notification!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: THE 'SWALLOW & IGNORE' ANTI-PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Executing Method with Empty Catch Block:");
        processTraineeFeePayment("Swadeep Paul", -5000);

        System.out.println("  [OUTPUT] Notice that the program continued with ZERO warnings or errors!");
        System.out.println("  [REALITY] The negative payment failed silently, corrupting accounts and leaving zero audit trace!");

        System.out.println("\n>>> EFFECTIVE JAVA ITEM 77 MANDATE:");
        System.out.println("  'An empty catch block defeats the entire purpose of exceptions.'");
        System.out.println("  If an exception should genuinely be ignored, the catch block MUST contain an explicit explanatory comment!");

        System.out.println("\n==========================================================================");
    }
}