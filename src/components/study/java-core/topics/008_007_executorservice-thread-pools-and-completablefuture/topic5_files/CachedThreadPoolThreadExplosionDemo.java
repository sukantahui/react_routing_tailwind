/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 5: Executors.newCachedThreadPool(): Dynamic Scaling & Thread Explosion Risks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CachedThreadPoolThreadExplosionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: Executors.newCachedThreadPool() DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. HOW newCachedThreadPool() IS CONSTRUCTED INTERNALLY:");
        System.out.println("  return new ThreadPoolExecutor(");
        System.out.println("      0, Integer.MAX_VALUE,         // corePoolSize = 0, maxPoolSize = 2,147,483,647!");
        System.out.println("      60L, TimeUnit.SECONDS,        // Idle threads killed after 60 seconds");
        System.out.println("      new SynchronousQueue<>()      // Zero-capacity handoff queue (NO buffering!)");
        System.out.println("  );");
        System.out.println();
        System.out.println(">>> 2. THE THREAD EXPLOSION DANGER:");
        System.out.println("  - 'SynchronousQueue' has ZERO buffer capacity; it cannot hold pending tasks.");
        System.out.println("  - If all existing threads are busy when a new task arrives, the pool IMMEDIATELY SPAWNS A BRAND NEW THREAD!");
        System.out.println("  - Under a flash spike of 10,000 requests, it attempts to create 10,000 OS threads simultaneously!");
        System.out.println("  - Result: CPU core thrashing and 'OutOfMemoryError: unable to create native thread'!");

        System.out.println("\n==========================================================================");
    }
}