/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 1: Stack Unwinding: Automatic Stack Frame Teardown & Finally Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class StackUnwindingLifecycleDemo {

    public static void depthThree() {
        try {
            System.out.println("      [DEPTH 3] Allocated frame. Triggering failure...");
            throw new RuntimeException("Database timeout in Barrackpore terminal!");
        } finally {
            System.out.println("      [DEPTH 3 FINALLY] Stack frame 3 unwinding cleanup complete.");
        }
    }

    public static void depthTwo() {
        try {
            System.out.println("    [DEPTH 2] Allocated frame. Calling depthThree...");
            depthThree();
        } finally {
            System.out.println("    [DEPTH 2 FINALLY] Stack frame 2 unwinding cleanup complete.");
        }
    }

    public static void depthOne() {
        try {
            System.out.println("  [DEPTH 1] Allocated frame. Calling depthTwo...");
            depthTwo();
        } catch (RuntimeException e) {
            System.out.println("  [DEPTH 1 CATCH] Intercepted after all inner frames unwound: " + e.getMessage());
        } finally {
            System.out.println("  [DEPTH 1 FINALLY] Stack frame 1 cleanup complete.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: STACK UNWINDING LIFECYCLE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Initiating Multi-Level Stack Unwinding Trace:");
        depthOne();

        System.out.println("\n>>> THE STACK UNWINDING GUARANTEE:");
        System.out.println("  Even as each intermediate stack frame is violently dismantled,");
        System.out.println("  every method's 'finally' block is GUARANTEED to execute before its frame is discarded!");

        System.out.println("\n==========================================================================");
    }
}