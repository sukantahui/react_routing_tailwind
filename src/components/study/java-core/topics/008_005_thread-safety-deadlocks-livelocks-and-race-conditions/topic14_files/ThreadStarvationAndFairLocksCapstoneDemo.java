/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 14: Thread Starvation & Fair Locks: Guaranteeing FIFO Acquisition (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ThreadStarvationAndFairLocksCapstoneDemo {

    // 1. FAIR LOCK (Enforces strict FIFO queue ordering to eliminate starvation):
    private static final Lock FAIR_LOCK = new ReentrantLock(true); // 'true' = Fair FIFO Lock!

    public static void accessResource(String threadName) {
        FAIR_LOCK.lock();
        try {
            System.out.printf("[%s] Acquired fair lock! Executing audit task...%n", threadName);
            Thread.sleep(100);
        } catch (InterruptedException ignored) {
        } finally {
            FAIR_LOCK.unlock();
            System.out.printf("[%s] Released fair lock.%n", threadName);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: THREAD STARVATION & FAIR LOCKS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS THREAD STARVATION?");
        System.out.println("  - Starvation occurs when a runnable thread is perpetually denied CPU time-slices or lock acquisition");
        System.out.println("    because greedy, higher-priority threads monopolize the shared resource.");
        System.out.println();
        System.out.println(">>> 2. NON-FAIR (BARGING) vs FAIR (FIFO) LOCKS:");
        System.out.println("  - Default 'synchronized' & 'new ReentrantLock()' are NON-FAIR (allow barging for higher throughput).");
        System.out.println("  - 'new ReentrantLock(true)' creates a FAIR Lock: guarantees longest-waiting thread gets lock next (0% Starvation)!");

        Thread t1 = new Thread(() -> accessResource("Student-Swadeep"), "T1");
        Thread t2 = new Thread(() -> accessResource("Student-Tuhina"), "T2");
        Thread t3 = new Thread(() -> accessResource("Student-Abhronila"), "T3");

        t1.start();
        t2.start();
        t3.start();

        t1.join();
        t2.join();
        t3.join();

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_005 THREAD SAFETY & DEADLOCKS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}