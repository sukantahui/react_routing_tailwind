/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 0: Exception Propagation: How Unhandled Errors Bubble Up the Call Stack
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class ExceptionPropagationBubblingDemo {

    // Method Level 3 (Deepest in call stack):
    public static void methodLevel3_LowLevelIO() {
        System.out.println("    [LEVEL 3] Reached deepest method. Triggering ArithmeticException (100 / 0)...");
        int fault = 100 / 0; // Unhandled here! Bubbles up to Level 2!
        System.out.println("    [LEVEL 3] This line will NEVER execute!");
    }

    // Method Level 2 (Intermediate layer):
    public static void methodLevel2_BusinessService() {
        System.out.println("  [LEVEL 2] Invoking Level 3...");
        methodLevel3_LowLevelIO(); // Unhandled here! Bubbles up to Level 1!
        System.out.println("  [LEVEL 2] This line will NEVER execute!");
    }

    // Method Level 1 (Top application layer with try-catch):
    public static void methodLevel1_Controller() {
        System.out.println("[LEVEL 1] Controller initiating request...");
        try {
            methodLevel2_BusinessService();
        } catch (ArithmeticException e) {
            System.out.println("[LEVEL 1 CATCH] Intercepted propagated error: " + e.getMessage());
        }
        System.out.println("[LEVEL 1] Controller completed gracefully.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: EXCEPTION PROPAGATION BUBBLING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Tracing Call Stack Propagation (Level 3 -> Level 2 -> Level 1):");
        methodLevel1_Controller();

        System.out.println("\n>>> HOW PROPAGATION WORKS:");
        System.out.println("  1. When an exception occurs in Level 3, the JVM looks for a local try-catch.");
        System.out.println("  2. Finding none, Level 3 stack frame is popped, and the error bubbles to Level 2.");
        System.out.println("  3. Finding none in Level 2, it bubbles to Level 1, where the catch block intercepts it!");

        System.out.println("\n==========================================================================");
    }
}