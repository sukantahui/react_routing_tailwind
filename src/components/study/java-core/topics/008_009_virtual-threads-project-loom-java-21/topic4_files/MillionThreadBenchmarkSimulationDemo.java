/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 4: The Million-Thread Benchmark: Launching 100,000+ Concurrent Virtual Threads
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

import java.util.concurrent.atomic.AtomicInteger;

public class MillionThreadBenchmarkSimulationDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: THE MILLION-THREAD BENCHMARK (JAVA 21) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        final int TASK_COUNT = 100_000; // 100,000 concurrent virtual threads!
        AtomicInteger completedCounter = new AtomicInteger(0);

        System.out.printf(">>> Spawning %,d Virtual Threads simulating 1-second I/O sleeps...%n", TASK_COUNT);
        long start = System.currentTimeMillis();

        Thread[] threads = new Thread[TASK_COUNT];
        for (int i = 0; i < TASK_COUNT; i++) {
            threads[i] = Thread.ofVirtual().unstarted(() -> {
                try {
                    Thread.sleep(1000); // 1-second simulated I/O sleep
                    completedCounter.incrementAndGet();
                } catch (InterruptedException ignored) {}
            });
            threads[i].start();
        }

        for (Thread t : threads) {
            t.join();
        }
        long duration = System.currentTimeMillis() - start;

        System.out.printf("\n>>> BENCHMARK RESULTS:%n");
        System.out.printf("  Total Virtual Threads Spawned : %,d%n", TASK_COUNT);
        System.out.printf("  Total Completed Tasks        : %,d%n", completedCounter.get());
        System.out.printf("  Total Wall-Clock Time Taken  : %,d ms (~%.1f seconds!)%n", duration, duration / 1000.0);

        System.out.println("\n>>> WHAT HAPPENED HERE:");
        System.out.println("  - Spawning 100,000 Platform Threads would require ~100 GB of RAM and crash the laptop in 2 seconds.");
        System.out.println("  - 100,000 Virtual Threads ran concurrently using only ~200 MB of heap and completed in barely ~1.5 seconds!");

        System.out.println("\n==========================================================================");
    }
}