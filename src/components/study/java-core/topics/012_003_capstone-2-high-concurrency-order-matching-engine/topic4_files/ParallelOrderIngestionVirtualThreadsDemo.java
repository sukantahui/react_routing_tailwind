/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 4: Parallel Ingestion with Java 21 Virtual Threads
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.LongAdder;

public class ParallelOrderIngestionVirtualThreadsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: PARALLEL ORDER INGESTION & VIRTUAL THREADS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LongAdder ingestedOrders = new LongAdder();
        int clientCount = 50_000;

        System.out.println(">>> Spawning " + clientCount + " Virtual Threads to simulate concurrent trader connections...");

        long startTime = System.currentTimeMillis();

        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < clientCount; i++) {
                executor.submit(() -> {
                    // Simulate parsing inbound FIX/WebSocket message:
                    ingestedOrders.increment();
                });
            }
        } // Auto-awaits completion of all virtual threads!

        long duration = System.currentTimeMillis() - startTime;

        System.out.println(">>> INGESTION PERFORMANCE:");
        System.out.println("  - Total Virtual Threads Processed : " + ingestedOrders.sum());
        System.out.println("  - Time Taken                     : " + duration + " ms");
        System.out.println("  - Throughput                     : " + (ingestedOrders.sum() * 1000L / Math.max(1, duration)) + " orders/sec");

        System.out.println("\n==========================================================================");
    }
}
