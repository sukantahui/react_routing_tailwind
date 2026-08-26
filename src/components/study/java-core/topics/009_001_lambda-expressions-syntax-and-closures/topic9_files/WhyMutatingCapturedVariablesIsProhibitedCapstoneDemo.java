/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 9: Why Mutating Captured Variables is Prohibited: Memory Semantics & Thread Safety (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.concurrent.atomic.AtomicInteger;

public class WhyMutatingCapturedVariablesIsProhibitedCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: WHY MUTATING CAPTURED VARIABLES IS PROHIBITED (CAPSTONE)");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE TWO DEEP ARCHITECTURAL REASONS (Brian Goetz):");
        System.out.println();
        System.out.println("  1. STACK LIFETIME & ESCAPING CLOSURES:");
        System.out.println("     - Local variables live on the Thread CALL STACK and DIE as soon as the method returns.");
        System.out.println("     - A lambda can outlive the method that created it (e.g. submitted to a background ExecutorService)!");
        System.out.println("     - If the lambda mutated a dead stack variable, it would point to corrupted memory!");
        System.out.println("     - Therefore, Java copies the value BY VALUE, not by reference.");
        System.out.println();
        System.out.println("  2. MULTITHREADED RACE CONDITIONS:");
        System.out.println("     - If lambdas running across 16 parallel threads could mutate a local primitive variable,");
        System.out.println("       it would introduce invisible, severe multi-threaded race conditions without synchronization!");
        System.out.println();
        System.out.println(">>> THE THREAD-SAFE WORKAROUND (HEAP WRAPPERS):");
        // If mutation is truly required, use a thread-safe heap object (like AtomicInteger or 1-element array):
        AtomicInteger safeAccumulator = new AtomicInteger(0);

        Runnable counterTask = () -> {
            safeAccumulator.incrementAndGet(); // Thread-safe heap mutation!
        };
        counterTask.run();
        counterTask.run();

        System.out.println(">>> Safe Accumulator Result on Heap: " + safeAccumulator.get());

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 009_001 LAMBDA EXPRESSIONS & LEXICAL SCOPING 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}