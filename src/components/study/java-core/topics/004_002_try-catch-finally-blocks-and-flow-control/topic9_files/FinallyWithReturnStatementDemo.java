/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 9: Corner Cases: Does 'finally' Execute When 'return' Is Inside try or catch? (YES!)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class FinallyWithReturnStatementDemo {

    public static int calculateDiscountWithEarlyReturn(boolean hasCoupon) {
        try {
            System.out.println("  1. Inside TRY block");
            if (hasCoupon) {
                System.out.println("  2. Early 'return 25' encountered in TRY block!");
                return 25; // Prepares to return 25% discount
            }
            System.out.println("  3. Standard 'return 10' in TRY block");
            return 10;
        } catch (Exception e) {
            System.out.println("  4. Inside CATCH");
            return 0;
        } finally {
            // THE CRUCIAL TEST: Does finally run before the return completes? YES!
            System.out.println("  5. [FINALLY EXECUTED] Cleanup executed BEFORE method returns to caller!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: 'finally' EXECUTION WITH 'return' STATEMENTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Calling Method with Early Return:");
        int discount = calculateDiscountWithEarlyReturn(true);

        System.out.println("\n>>> Method Returned to Main with Value: " + discount + "%");

        System.out.println("\n>>> JVM BEHAVIOR:");
        System.out.println("  When the JVM encounters 'return', it temporarily stores the return value in a local variable,");
        System.out.println("  executes the 'finally' block completely, and THEN finishes returning to the caller!");

        System.out.println("\n==========================================================================");
    }
}