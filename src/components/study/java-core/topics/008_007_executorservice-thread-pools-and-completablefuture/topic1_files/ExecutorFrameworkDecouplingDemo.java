/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 1: The Executor Framework: Decoupling Task Submission from Thread Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorFrameworkDecouplingDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE EXECUTOR FRAMEWORK ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. CREATE A BOUNDED THREAD POOL OF 2 WORKERS:
        ExecutorService executor = Executors.newFixedThreadPool(2);

        System.out.println(">>> Submitting 4 GST Accounting Tasks to the 2-Worker Pool:");
        for (int i = 1; i <= 4; i++) {
            final int taskId = i;
            // DECOUPLING: Submitting a Runnable task (WHAT) without knowing which thread executes it (HOW):
            executor.submit(() -> {
                String workerName = Thread.currentThread().getName();
                System.out.printf("  [Task #%d] Executing on Worker: %s...%n", taskId, workerName);
                try { Thread.sleep(200); } catch (InterruptedException ignored) {}
                System.out.printf("  [Task #%d] Completed!%n", taskId);
            });
        }

        // 2. INITIATING CLEAN SHUTDOWN:
        executor.shutdown();

        System.out.println("\n>>> CORE ADVANTAGES OF THE EXECUTOR FRAMEWORK (Doug Lea):");
        System.out.println("  1. Clean Decoupling       : Separates the 'WHAT' (Runnable/Callable task) from the 'HOW' (Thread scheduling & execution).");
        System.out.println("  2. Continuous Worker Reuse: The 2 pooled threads stay alive, picking up tasks from the queue continuously without destruction overhead.");
        System.out.println("  3. Throttling & Protection: A maximum of 2 threads run simultaneously, protecting server CPU & RAM from exhaustion!");

        System.out.println("\n==========================================================================");
    }
}