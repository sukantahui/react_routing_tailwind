/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 0: The Problem of Shared Mutable State: Race Conditions & Data Corruption
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class SharedMutableStateRaceConditionDemo {

    // Shared Mutable State on Heap without synchronization:
    private static int counter = 0;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: SHARED MUTABLE STATE & RACE CONDITIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable incrementTask = () -> {
            for (int i = 0; i < 50_000; i++) {
                // 'counter++' is NOT ATOMIC! It compiles to 3 distinct CPU instructions:
                // 1. READ: Load 'counter' from memory into CPU register.
                // 2. MODIFY: Increment register value by 1.
                // 3. WRITE: Write register value back to 'counter' in memory.
                counter++;
            }
        };

        Thread t1 = new Thread(incrementTask, "Incrementer-Thread-1");
        Thread t2 = new Thread(incrementTask, "Incrementer-Thread-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(">>> EXPERIMENT RESULTS (50,000 + 50,000 Expected = 100,000):");
        System.out.printf("  Actual Final Counter Value: %,d (Data Corrupted due to Race Condition!)%n", counter);

        System.out.println("\n>>> WHY DID DATA LOSS OCCUR?");
        System.out.println("  - When Thread 1 and Thread 2 read counter at the same time (e.g. value = 10):");
        System.out.println("    * Both increment their local register to 11.");
        System.out.println("    * Both write 11 back to memory.");
        System.out.println("    * 2 increments occurred, but the counter only increased by 1! (Lost Update Anomaly).");

        System.out.println("\n==========================================================================");
    }
}