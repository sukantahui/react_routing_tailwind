/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 1: The Memory Visibility Problem: Stale CPU Caches & Infinite Worker Loops
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class MemoryVisibilityInfiniteLoopDemo {

    // NON-VOLATILE SHARED FLAG:
    private static boolean running = true;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE MEMORY VISIBILITY PROBLEM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread workerThread = new Thread(() -> {
            long count = 0;
            System.out.println("  [Worker Thread] Started executing loop...");

            // JIT COMPILER OPTIMIZATION (Hoisting):
            // Because 'running' is NOT volatile, JIT compiler transforms 'while(running)' into:
            // 'if (running) while(true) count++;' (Caching 'running = true' inside CPU register permanently!)
            while (running) {
                count++;
            }

            System.out.printf("  [Worker Thread] FINISHED loop after %,d iterations!%n", count);
        }, "Worker-Thread");

        workerThread.start();
        Thread.sleep(100); // Let worker start spinning

        System.out.println(">>> Main Thread changing 'running = false' in memory...");
        running = false; // Writes false to Main thread's cache/RAM

        System.out.println(">>> Main thread waiting for worker to finish via join(1000)...");
        workerThread.join(1000); // Will TIME OUT because worker is stuck in infinite loop!

        if (workerThread.isAlive()) {
            System.out.println("\n🚨 WORKER THREAD IS STUCK IN INFINITE LOOP!");
            System.out.println("  Reason: Worker thread cached 'running = true' in its CPU L1 register and NEVER saw main thread's update!");
            System.exit(0); // Terminate demo
        }

        System.out.println("\n==========================================================================");
    }
}