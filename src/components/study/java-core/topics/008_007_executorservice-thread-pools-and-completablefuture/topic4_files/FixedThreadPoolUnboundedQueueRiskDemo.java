/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 4: Executors.newFixedThreadPool(n): Fixed Workers & Unbounded LinkedBlockingQueue
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class FixedThreadPoolUnboundedQueueRiskDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: Executors.newFixedThreadPool(n) DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Fixed thread pool with exactly 3 worker threads:
        ExecutorService fixedPool = Executors.newFixedThreadPool(3);

        System.out.println(">>> 1. HOW newFixedThreadPool(3) IS CONSTRUCTED INTERNALLY:");
        System.out.println("  return new ThreadPoolExecutor(");
        System.out.println("      3, 3,                         // corePoolSize = 3, maxPoolSize = 3");
        System.out.println("      0L, TimeUnit.MILLISECONDS,    // keepAliveTime = 0 (threads never die)");
        System.out.println("      new LinkedBlockingQueue<>()   // Capacity = Integer.MAX_VALUE (2,147,483,647!)");
        System.out.println("  );");
        System.out.println();

        System.out.println(">>> 2. Submitting 6 tasks to FixedThreadPool:");
        for (int i = 1; i <= 6; i++) {
            final int id = i;
            fixedPool.submit(() -> {
                System.out.printf("  [Task #%d] Running on %s%n", id, Thread.currentThread().getName());
                try { Thread.sleep(150); } catch (InterruptedException ignored) {}
            });
        }

        fixedPool.shutdown();

        System.out.println("\n==========================================================================");
    }
}