/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 6: The 'Log and Throw' Anti-Pattern: Preventing Log Clutter & Duplicate Alerts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class LogAndThrowAntiPatternDemo {

    // ANTI-PATTERN: Logging the error AND rethrowing it at every layer!
    public static void badDataLayer() {
        try {
            int err = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("  [BAD LOG LAYER 1 - DAO] Error occurred: " + e.getMessage());
            throw e; // RETHROWING AFTER LOGGING!
        }
    }

    public static void badServiceLayer() {
        try {
            badDataLayer();
        } catch (ArithmeticException e) {
            System.out.println("  [BAD LOG LAYER 2 - SERVICE] Error in service: " + e.getMessage());
            throw e; // RETHROWING AFTER LOGGING AGAIN!
        }
    }

    // BEST PRACTICE: Handle OR Rethrow - NEVER BOTH!
    public static void cleanController() {
        try {
            badServiceLayer();
        } catch (ArithmeticException e) {
            // ONLY the outermost boundary logs the complete error once:
            System.out.println("  [CLEAN LOG - CONTROLLER BOUNDARY ONLY] Error handled once with full trace: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE 'LOG AND THROW' ANTI-PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Executing Request with Log-and-Throw Clutter:");
        cleanController();

        System.out.println("\n>>> THE GOLDEN LOGGING RULE:");
        System.out.println("  Either HANDLE the exception (and log it), OR RETHROW it (so the caller can handle it).");
        System.out.println("  NEVER DO BOTH! Doing both multiplies log noise by 5x and triggers false alarm storms in monitoring!");

        System.out.println("\n==========================================================================");
    }
}