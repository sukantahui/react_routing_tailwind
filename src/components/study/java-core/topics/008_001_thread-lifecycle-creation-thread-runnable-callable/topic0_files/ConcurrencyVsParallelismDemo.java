/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 0: Concurrency vs Parallelism: Time-Slicing vs True Multi-Core Simultaneity
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ConcurrencyVsParallelismDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: CONCURRENCY vs PARALLELISM - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        int availableCores = Runtime.getRuntime().availableProcessors();
        System.out.println(">>> 1. Hardware Architecture Metrics:");
        System.out.println("  Available Hardware CPU Cores / SMT Threads: " + availableCores);

        System.out.println("\n>>> 2. CONCURRENCY vs PARALLELISM DEFINITION:");
        System.out.println("  - CONCURRENCY (Dealing with lots of things at once - Rob Pike):");
        System.out.println("    * Structure/Design: Interleaving multiple tasks on a single CPU core via OS Context Switching (Time-Slicing).");
        System.out.println("    * Illusion of Simultaneity: Rapid switching makes tasks appear to run at the same time.");
        System.out.println();
        System.out.println("  - PARALLELISM (Doing lots of things at once):");
        System.out.println("    * Hardware Execution: Physically executing multiple instructions simultaneously across distinct physical CPU cores.");
        System.out.println("    * Requires Multi-Core Hardware: Truly runs at the exact same physical nanosecond!");

        System.out.println("\n>>> REAL-WORLD ANALOGY (Barrackpore AccoTax Office):");
        System.out.println("  - Concurrency : 1 Accountant (Single Core) switching between Swadeep's GST filing and Tuhina's Tax Audit every 5 minutes.");
        System.out.println("  - Parallelism : 2 Accountants (Dual Core) filing Swadeep's and Tuhina's returns at the exact same time on separate desks!");

        System.out.println("\n==========================================================================");
    }
}