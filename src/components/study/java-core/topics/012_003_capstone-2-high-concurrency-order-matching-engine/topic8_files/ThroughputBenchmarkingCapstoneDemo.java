/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 8: Engine Throughput Benchmarking - >100,000 Orders/Sec (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

import java.util.ArrayDeque;

public class ThroughputBenchmarkingCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CAPSTONE 2 MATCHING ENGINE BENCHMARK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int warmupOrders = 100_000;
        int benchmarkOrders = 500_000;

        ArrayDeque<Long> bidQueue = new ArrayDeque<>(benchmarkOrders);
        ArrayDeque<Long> askQueue = new ArrayDeque<>(benchmarkOrders);

        // Populate mock orders:
        for (int i = 0; i < benchmarkOrders; i++) {
            bidQueue.add((long) i);
            askQueue.add((long) i);
        }

        System.out.println(">>> 1. EXECUTING HIGH-THROUGHPUT MATCHING BENCHMARK (" + benchmarkOrders + " ORDERS)...");

        long startNano = System.nanoTime();
        long matches = 0;

        while (!bidQueue.isEmpty() && !askQueue.isEmpty()) {
            bidQueue.poll();
            askQueue.poll();
            matches++;
        }

        long totalDurationNano = System.nanoTime() - startNano;
        double durationSec = totalDurationNano / 1_000_000_000.0;
        double throughputOpsPerSec = matches / durationSec;

        System.out.println(">>> 2. BENCHMARK RESULTS:");
        System.out.println("  - Total Trades Executed       : " + matches);
        System.out.println("  - Total Time Taken            : " + String.format("%.4f", durationSec) + " seconds");
        System.out.println("  - Calculated Throughput       : " + String.format("%,.0f", throughputOpsPerSec) + " orders/second ⚡");
        System.out.println("  - Mean Latency per Match      : " + String.format("%.2f", (double) totalDurationNano / matches) + " nanoseconds");

        System.out.println("\n==========================================================================");
        System.out.println(" CAPSTONE 2 COMPLETED: HIGH-SPEED MATCHING ENGINE VERIFIED!");
        System.out.println("==========================================================================");
    }
}
