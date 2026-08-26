/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 5: The volatile Keyword in Java: Lightweight Non-Blocking Visibility
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class VolatileKeywordOverviewDemo {

    // 1. VOLATILE FIELD:
    // - Guarantees all writes are immediately written to main RAM.
    // - Guarantees all reads are loaded directly from main RAM (never stale in CPU cache!).
    private static volatile boolean active = true;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE volatile KEYWORD OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread worker = new Thread(() -> {
            long loopCount = 0;
            System.out.println("  [Worker] Worker thread running with volatile 'active' flag...");

            // Because 'active' is VOLATILE, JIT cannot hoist it into a register!
            // It MUST re-read from memory on every loop iteration:
            while (active) {
                loopCount++;
            }

            System.out.printf(">>> [Worker] Instant reaction! Stopped after %,d iterations.%n", loopCount);
        }, "Volatile-Worker");

        worker.start();
        Thread.sleep(100);

        System.out.println(">>> Main thread setting 'active = false'...");
        active = false; // Immediately visible to worker thread!

        worker.join(); // Terminates cleanly without hanging!

        System.out.println("\n>>> THE 2 CORE PILLARS OF volatile IN JAVA:");
        System.out.println("  1. Memory Visibility           : Flushes writes to RAM; forces reads from RAM.");
        System.out.println("  2. Instruction Ordering Fences : Prevents compiler and CPU instruction reordering across volatile reads/writes.");

        System.out.println("\n==========================================================================");
    }
}