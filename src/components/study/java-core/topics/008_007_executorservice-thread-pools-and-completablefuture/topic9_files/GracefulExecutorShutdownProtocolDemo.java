/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 9: Graceful Shutdown: 2-Phase Protocol via shutdown(), shutdownNow() & awaitTermination()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class GracefulExecutorShutdownProtocolDemo {

    // 1. CANONICAL 2-PHASE SHUTDOWN PROTOCOL (Oracle / Doug Lea standard):
    public static void shutdownAndAwaitTermination(ExecutorService pool) {
        // Phase 1: Disable new tasks from being submitted:
        pool.shutdown();
        try {
            // Wait up to 5 seconds for existing tasks to terminate:
            if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {
                System.out.println("  [Shutdown Handler] Tasks took > 5s. Cancelling running tasks via shutdownNow()...");
                // Phase 2: Cancel currently executing tasks via interrupt:
                List<Runnable> droppedTasks = pool.shutdownNow();
                System.out.printf("  [Shutdown Handler] Dropped %d queued tasks.%n", droppedTasks.size());

                // Wait another 5 seconds for tasks to respond to interrupt:
                if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {
                    System.err.println("  [Shutdown Handler] CRITICAL: Thread pool did NOT terminate cleanly!");
                }
            }
        } catch (InterruptedException ie) {
            // Re-cancel if current thread was also interrupted:
            pool.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: GRACEFUL EXECUTOR SERVICE SHUTDOWN PROTOCOL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(() -> {
            System.out.println("  [Worker] Performing task safely...");
            try { Thread.sleep(200); } catch (InterruptedException ignored) {}
            System.out.println("  [Worker] Finished task safely before shutdown!");
        });

        System.out.println(">>> Executing 2-Phase Graceful Shutdown Protocol...");
        shutdownAndAwaitTermination(executor);

        System.out.println("\n>>> Pool shutdown complete! Is Terminated? " + executor.isTerminated());

        System.out.println("\n==========================================================================");
    }
}