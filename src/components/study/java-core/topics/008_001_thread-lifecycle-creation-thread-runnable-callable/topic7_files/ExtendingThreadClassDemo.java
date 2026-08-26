/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 7: Thread Creation Method 1: Extending java.lang.Thread and Overriding run()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

// 1. EXTENDING java.lang.Thread CLASS:
class GstBatchProcessingThread extends Thread {

    private final String batchName;

    public GstBatchProcessingThread(String batchName) {
        super("Thread-" + batchName); // Passes custom name to Thread constructor
        this.batchName = batchName;
    }

    // Overriding the entry point method for thread execution:
    @Override
    public void run() {
        System.out.printf("[%s] Started calculating GST reconciliation for %s...%n",
                Thread.currentThread().getName(), batchName);
        try {
            Thread.sleep(500); // Simulate processing
        } catch (InterruptedException ignored) {}
        System.out.printf("[%s] Successfully completed %s GST batch!%n",
                Thread.currentThread().getName(), batchName);
    }
}

public class ExtendingThreadClassDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CREATION METHOD 1: EXTENDING Thread CLASS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        GstBatchProcessingThread t1 = new GstBatchProcessingThread("Barrackpore-Q1");
        GstBatchProcessingThread t2 = new GstBatchProcessingThread("Naihati-Q1");

        // Invoking start() creates a new native OS thread:
        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("\n>>> DRAWBACKS OF EXTENDING Thread CLASS (ANTI-PATTERN IN MODERN JAVA):");
        System.out.println("  1. Single Inheritance Limitation: Java does not support multiple class inheritance. If you extend Thread, you cannot extend any other domain class (e.g. 'extends BaseEntity')!");
        System.out.println("  2. Tight Coupling: Tightly couples the task algorithm ('run()') with the thread execution mechanism ('Thread').");
        System.out.println("  3. No Thread Pool Reuse: You cannot easily submit a Thread subclass to ExecutorService thread pools for reuse.");

        System.out.println("\n==========================================================================");
    }
}