/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 12: Creating Asynchronous Stages: supplyAsync vs runAsync & Custom Thread Pools
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SupplyAsyncRunAsyncCreationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: supplyAsync vs runAsync CREATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ExecutorService customIoPool = Executors.newFixedThreadPool(4);

        // 1. runAsync(Runnable): Fire-and-forget task with NO return value (CompletableFuture<Void>):
        CompletableFuture<Void> runStage = CompletableFuture.runAsync(() -> {
            System.out.printf("  [runAsync] Emitting background telemetry on: %s%n",
                    Thread.currentThread().getName());
        }, customIoPool);

        // 2. supplyAsync(Supplier<U>): Asynchronous task returning a value (CompletableFuture<U>):
        CompletableFuture<String> supplyStage = CompletableFuture.supplyAsync(() -> {
            System.out.printf("  [supplyAsync] Querying Barrackpore GST Database on: %s%n",
                    Thread.currentThread().getName());
            return "GST-INVOICE-#98421";
        }, customIoPool);

        // Wait for both to complete:
        runStage.join();
        String invoice = supplyStage.join();

        System.out.println(">>> Retrieved Invoice Result: " + invoice);

        customIoPool.shutdown();

        System.out.println("\n==========================================================================");
    }
}