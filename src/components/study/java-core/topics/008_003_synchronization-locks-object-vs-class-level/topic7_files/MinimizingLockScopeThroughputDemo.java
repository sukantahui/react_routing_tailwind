/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 7: Minimizing Lock Scope: Reducing Contention to Maximize Parallel Throughput
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.ArrayList;
import java.util.List;

public class MinimizingLockScopeThroughputDemo {

    private final List<String> certificateLedger = new ArrayList<>();
    private final Object ledgerLock = new Object();

    // OPTIMIZED PATTERN: EXPENSIVE WORK OUTSIDE LOCK, CRITICAL STATE INSIDE LOCK:
    public void generateAndSaveCertificate(String studentName, int score) {
        // Step 1: EXPENSIVE CPU / I/O WORK (Takes 300 ms, executed 100% in parallel!):
        String certData = String.format("CERT-%05d: %s [Marks: %d/100, Institute: Barrackpore AccoTax]",
                System.currentTimeMillis() % 10000, studentName, score);
        try { Thread.sleep(300); } catch (InterruptedException ignored) {} // Expensive work

        // Step 2: SHORT CRITICAL SECTION (Takes 0.001 ms, lock held for microseconds!):
        synchronized (ledgerLock) {
            certificateLedger.add(certData);
            System.out.printf("[%s] Saved to Ledger: %s%n", Thread.currentThread().getName(), certData);
        } // Lock immediately released!
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: MINIMIZING LOCK SCOPE & CONTENTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        MinimizingLockScopeThroughputDemo demo = new MinimizingLockScopeThroughputDemo();

        long start = System.currentTimeMillis();

        Thread t1 = new Thread(() -> demo.generateAndSaveCertificate("Swadeep", 98), "Worker-1");
        Thread t2 = new Thread(() -> demo.generateAndSaveCertificate("Tuhina", 99), "Worker-2");
        Thread t3 = new Thread(() -> demo.generateAndSaveCertificate("Abhronila", 97), "Worker-3");

        t1.start();
        t2.start();
        t3.start();

        t1.join();
        t2.join();
        t3.join();

        long duration = System.currentTimeMillis() - start;
        System.out.printf("\n>>> Total Time Taken: %d ms (All 3 certificates generated in parallel ~300 ms!)%n", duration);
        System.out.println("  - If entire method was synchronized, total time would be 3 x 300 ms = 900 ms (3x SLOWER)!");

        System.out.println("\n==========================================================================");
    }
}