/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 11: Performance Overhead of Synchronization: Context Switching & JMM Flushes (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class SynchronizationOverheadCapstoneDemo {

    private static final int ITERATIONS = 10_000_000;
    private static int unsyncedCount = 0;
    private static int syncedCount = 0;
    private static final Object LOCK = new Object();

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: SYNCHRONIZATION OVERHEAD & JMM FLUSHES (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Benchmark: Unsynchronized Loop (Single-threaded baseline):
        long start1 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) {
            unsyncedCount++; // Raw CPU L1 register increment
        }
        long dur1 = System.currentTimeMillis() - start1;

        // 2. Benchmark: Synchronized Loop (Memory barrier & lock acquisition):
        long start2 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) {
            synchronized (LOCK) {
                syncedCount++; // Enforces monitorenter, memory barrier, monitorexit
            }
        }
        long dur2 = System.currentTimeMillis() - start2;

        System.out.println(">>> 10,000,000 ITERATIONS BENCHMARK RESULTS:");
        System.out.printf("  1. Unsynchronized Time: %,5d ms%n", dur1);
        System.out.printf("  2. Synchronized Time  : %,5d ms%n", dur2);
        System.out.printf("  ⚡ OVERHEAD FACTOR    : Synchronized is %.1fx slower due to memory barriers!%n",
                (double) dur2 / Math.max(dur1, 1));

        System.out.println("\n>>> WHY SYNCHRONIZATION INCURS HARDWARE OVERHEAD:");
        System.out.println("  1. Memory Barrier (JMM)  : 'monitorexit' forces modified CPU registers to flush to L3/RAM; 'monitorenter' invalidates local L1 cache.");
        System.out.println("  2. OS Context Switches   : If lock is contested (Heavyweight), the OS puts the thread to sleep, requiring ~2000 CPU cycles to switch stacks!");
        System.out.println("  3. Prevents Optimization : JIT compiler cannot reorder or hoist instructions across synchronization boundaries.");

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_003 THREAD SYNCHRONIZATION & LOCKS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}