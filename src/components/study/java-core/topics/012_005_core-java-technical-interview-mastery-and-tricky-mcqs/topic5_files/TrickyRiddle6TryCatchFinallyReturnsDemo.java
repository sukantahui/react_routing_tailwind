/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 5: Tricky Riddle 6 - try-catch-finally Return Value Overrides
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

public class TrickyRiddle6TryCatchFinallyReturnsDemo {

    public static int testReturnOverride() {
        try {
            return 10;
        } finally {
            return 20; // OVERWRITES the 10 from try block!
        }
    }

    public static int testExceptionSwallowed() {
        try {
            throw new RuntimeException("Fatal Error!");
        } finally {
            return 999; // SILENTLY SWALLOWS the RuntimeException!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TRICKY RIDDLE 6: FINALLY RETURN OVERRIDES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("1. testReturnOverride() output   -> " + testReturnOverride()); // 20
        System.out.println("2. testExceptionSwallowed() output -> " + testExceptionSwallowed()); // 999 (No Exception thrown!)

        System.out.println("
WARNING: Returning from a finally block suppresses all pending exceptions");
        System.out.println("and overwrites all try/catch return statements.");

        System.out.println("\n==========================================================================");
    }
}
