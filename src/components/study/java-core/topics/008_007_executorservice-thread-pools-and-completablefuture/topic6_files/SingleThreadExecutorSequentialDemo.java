/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 6: Executors.newSingleThreadExecutor(): Sequential FIFO Processing & Crash Resilience
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SingleThreadExecutorSequentialDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: Executors.newSingleThreadExecutor() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Single-threaded executor: Guaranteed strict sequential execution:
        ExecutorService singleExecutor = Executors.newSingleThreadExecutor();

        System.out.println(">>> Submitting 3 Audit Log Events (Guaranteed FIFO Execution Order):");
        for (int i = 1; i <= 3; i++) {
            final int eventId = i;
            singleExecutor.submit(() -> {
                System.out.printf("  [Audit Log #%d] Written to disk by %s%n",
                        eventId, Thread.currentThread().getName());
            });
        }

        singleExecutor.shutdown();

        System.out.println("\n>>> WHY SingleThreadExecutor IS SUPERIOR TO A MANUAL SINGLE THREAD:");
        System.out.println("  1. Strict FIFO Ordering  : Guaranteed that no two tasks execute concurrently.");
        System.out.println("  2. Automatic Self-Healing: If a task throws an uncaught RuntimeException and kills the worker thread, the executor AUTOMATICALLY SPAWNS A NEW WORKER THREAD to execute remaining queued tasks!");

        System.out.println("\n==========================================================================");
    }
}