/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 2: java.lang.Error: Unrecoverable System Failures (OutOfMemoryError, StackOverflowError)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class UnrecoverableErrorsDemo {

    // Simulating infinite recursion triggering StackOverflowError:
    public static void recursiveStackOverflow(int counter) {
        if (counter % 5000 == 0) {
            System.out.println("  Depth: " + counter);
        }
        recursiveStackOverflow(counter + 1); // Never terminates until call stack memory is exhausted!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: java.lang.Error UNRECOVERABLE FAILURES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 Classic Examples of Fatal java.lang.Error:");
        System.out.println("  1. OutOfMemoryError (OOM)  : JVM Heap RAM is completely exhausted.");
        System.out.println("  2. StackOverflowError (SOE): Call stack memory exhausted by infinite recursion.");
        System.out.println("  3. VirtualMachineError     : The underlying JVM is broken or severely corrupted.");

        System.out.println("\n>>> Demonstrating StackOverflowError Catch & Diagnosis (For educational analysis only):");
        try {
            recursiveStackOverflow(1);
        } catch (StackOverflowError e) {
            System.out.println("\n  [CAUGHT FATAL ERROR] StackOverflowError occurred!");
            System.out.println("  Class: " + e.getClass().getName());
            System.out.println("  NOTE: In real applications, NEVER catch Errors! Let the process crash and alert DevOps.");
        }

        System.out.println("\n==========================================================================");
    }
}