/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 1: The Two Taxonomies of Race Conditions: Read-Modify-Write & Check-Then-Act
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class RaceConditionCategoriesTaxonomyDemo {

    // 1. Category 1: Read-Modify-Write Shared Variable:
    private static int studentCounter = 0;

    // 2. Category 2: Check-Then-Act Lazy Singleton Target:
    private static Object lazySingletonInstance = null;

    // VULNERABLE CHECK-THEN-ACT METHOD:
    public static Object getLazyInstance(String threadName) {
        // CHECK:
        if (lazySingletonInstance == null) {
            System.out.printf("[%s] Checked instance == null (TRUE). Creating new instance...%n", threadName);
            try { Thread.sleep(50); } catch (InterruptedException ignored) {} // Delay
            // ACT:
            lazySingletonInstance = new Object(); // Multiple instances created! (Breaks Singleton Invariant!)
        }
        return lazySingletonInstance;
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: CATEGORIES OF RACE CONDITIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. DEMONSTRATING CHECK-THEN-ACT HAZARD (Lazy Initialization):");
        Thread t1 = new Thread(() -> getLazyInstance("Thread-Swadeep"), "T1");
        Thread t2 = new Thread(() -> getLazyInstance("Thread-Tuhina"), "T2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("\n>>> THE 2 MAIN TAXONOMIES OF RACE CONDITIONS:");
        System.out.println("+-----------------------+---------------------------------------+-----------------------------------+");
        System.out.println("| Category              | Classic Scenario                      | Solution                          |");
        System.out.println("+-----------------------+---------------------------------------+-----------------------------------+");
        System.out.println("| 1. Read-Modify-Write  | count++, balance += x, i--            | AtomicInteger, synchronized block |");
        System.out.println("| 2. Check-Then-Act     | if(obj==null) create(); if(bal>=x) pay| Double-Checked Locking / Mutex    |");
        System.out.println("+-----------------------+---------------------------------------+-----------------------------------+");

        System.out.println("\n==========================================================================");
    }
}