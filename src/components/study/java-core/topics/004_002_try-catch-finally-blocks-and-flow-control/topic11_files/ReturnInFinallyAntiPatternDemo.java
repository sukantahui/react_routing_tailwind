/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 11: The 'return in finally' Anti-Pattern: Value Overriding & Exception Swallowing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class ReturnInFinallyAntiPatternDemo {

    // SEVERE ANTI-PATTERN: Returning inside 'finally' overrides try return:
    public static int badReturnOverride() {
        try {
            return 100; // Expected return
        } finally {
            return 999; // FATAL: Overrides and destroys the return value of 100!
        }
    }

    // DISASTER ANTI-PATTERN: Returning inside 'finally' SILENTLY SWALLOWS EXCEPTIONS!
    public static void dangerousExceptionSwallowing() {
        try {
            throw new RuntimeException("CRITICAL DATABASE CORRUPTION AT BARRACKPORE HUB!");
        } finally {
            return; // FATAL: Silently suppresses and discards the thrown RuntimeException!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: THE 'return in finally' ANTI-PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Demonstrating Return Value Destruction:");
        int val = badReturnOverride();
        System.out.println("  Method returned: " + val + " (Expected 100, but finally returned 999!)");

        System.out.println("\n>>> 2. Demonstrating Silent Exception Swallowing:");
        System.out.println("  Calling method that throws RuntimeException...");
        dangerousExceptionSwallowing();
        System.out.println("  [SHOCKING] Method returned normally! The RuntimeException was completely LOST!");

        System.out.println("\n>>> GOLDEN RULE:");
        System.out.println("  NEVER EVER place a 'return', 'break', or 'throw' inside a 'finally' block!");

        System.out.println("\n==========================================================================");
    }
}