/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 10: Concurrency Synchronizer 3: Semaphore (Permit Throttling & Rate Limiting) (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.Semaphore;

public class SemaphoreRateLimiterCapstoneDemo {

    // 1. Semaphore with 2 permits (Max 2 concurrent database connections allowed):
    private static final Semaphore DB_CONNECTION_POOL = new Semaphore(2);

    public static void accessDatabase(String studentName) {
        try {
            System.out.printf("[%s] Requesting DB connection permit... (Available: %d)%n",
                    studentName, DB_CONNECTION_POOL.availablePermits());

            // Acquire 1 permit (Blocks if all 2 permits are currently held):
            DB_CONNECTION_POOL.acquire();

            System.out.printf(">>> [%s] GRANTED PERMIT! Querying GST Ledger...%n", studentName);
            Thread.sleep(300); // Simulate DB query
        } catch (InterruptedException ignored) {
        } finally {
            System.out.printf("[%s] Finished query. Releasing permit.%n", studentName);
            // Mandatory: ALWAYS release permit in finally block:
            DB_CONNECTION_POOL.release();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: Semaphore PERMIT THROTTLING & RATE LIMITING (CAPSTONE)");
        System.out.println("==========================================================================\n");

        Thread t1 = new Thread(() -> accessDatabase("Swadeep"), "T1");
        Thread t2 = new Thread(() -> accessDatabase("Tuhina"), "T2");
        Thread t3 = new Thread(() -> accessDatabase("Abhronila"), "T3");
        Thread t4 = new Thread(() -> accessDatabase("Debangshu"), "T4");

        t1.start(); t2.start(); t3.start(); t4.start();

        t1.join(); t2.join(); t3.join(); t4.join();

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_008 EXPLICIT LOCKS & SYNCHRONIZERS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}