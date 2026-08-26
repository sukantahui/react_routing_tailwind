/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 7: ScheduledExecutorService: scheduleAtFixedRate vs scheduleWithFixedDelay
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduledThreadPoolRateVsDelayDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: scheduleAtFixedRate vs scheduleWithFixedDelay - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);

        // 1. One-shot Delayed Execution:
        scheduler.schedule(() -> {
            System.out.println("  [One-Shot Task] Executed once after a 300 ms initial delay!");
        }, 300, TimeUnit.MILLISECONDS);

        // 2. scheduleAtFixedRate (Clock-Based Cadence):
        // Period = 500 ms (Starts every 500 ms REGARDLESS of how long task takes, unless task duration > period):
        scheduler.scheduleAtFixedRate(() -> {
            System.out.printf("  [FixedRate Tick] Running periodic GST sync at: %d ms%n", System.currentTimeMillis() % 10000);
        }, 100, 500, TimeUnit.MILLISECONDS);

        // 3. scheduleWithFixedDelay (Gap-Based Cadence):
        // Delay = 500 ms AFTER previous task completes its execution:
        scheduler.scheduleWithFixedDelay(() -> {
            System.out.printf("  [FixedDelay Tick] Running database backup at: %d ms%n", System.currentTimeMillis() % 10000);
            try { Thread.sleep(100); } catch (InterruptedException ignored) {} // Task duration = 100 ms
            // Next execution starts 500 ms AFTER this sleep finishes! (Total cycle = 600 ms)
        }, 100, 500, TimeUnit.MILLISECONDS);

        Thread.sleep(1600); // Allow ticks to run
        scheduler.shutdown();

        System.out.println("\n>>> scheduleAtFixedRate vs scheduleWithFixedDelay COMPARISON:");
        System.out.println("  - scheduleAtFixedRate : Measures interval from START of Task 1 to START of Task 2.");
        System.out.println("  - scheduleWithFixedDelay: Measures interval from END of Task 1 to START of Task 2 (Guarantees pause gap!).");

        System.out.println("\n==========================================================================");
    }
}