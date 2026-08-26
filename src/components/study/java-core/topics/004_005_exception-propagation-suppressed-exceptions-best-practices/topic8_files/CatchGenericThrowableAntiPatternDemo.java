/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 8: The 'Catch Generic Throwable/Exception' Anti-Pattern
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class CatchGenericThrowableAntiPatternDemo {

    // ANTI-PATTERN 1: Catching 'Throwable' (Swallows OutOfMemoryError and ThreadDeath):
    public static void dangerousCatchThrowable() {
        try {
            // Risky operation
            String text = null;
            text.toLowerCase();
        } catch (Throwable t) {
            // DANGEROUS: Intercepts fatal JVM Errors like OutOfMemoryError or StackOverflowError!
            System.out.println("  [DANGEROUS] Intercepted Throwable: " + t.getClass().getSimpleName());
        }
    }

    // BEST PRACTICE: Catch specific, intended exceptions:
    public static void specificCleanCatch() {
        try {
            String text = null;
            text.toLowerCase();
        } catch (NullPointerException e) {
            System.out.println("  [BEST PRACTICE] Caught specific NullPointerException.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CATCH GENERIC THROWABLE ANTI-PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Dangerous Generic Catch Throwable:");
        dangerousCatchThrowable();

        System.out.println("\n>>> 2. Clean Specific Catch:");
        specificCleanCatch();

        System.out.println("\n>>> WHY CATCHING THROWABLE IS DANGEROUS:");
        System.out.println("  1. 'Throwable' includes 'java.lang.Error' (OutOfMemoryError, InternalError).");
        System.out.println("  2. Swallowing Errors traps the JVM in a damaged, corrupted state without recovery.");
        System.out.println("  3. Always catch specific domain exceptions or at most 'Exception' at the outermost boundary.");

        System.out.println("\n==========================================================================");
    }
}