/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 2: ForkJoinPool.commonPool() Architecture & Thread Count
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.concurrent.ForkJoinPool;
import java.util.stream.IntStream;

public class ForkJoinPoolCommonEngineDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: FORKJOINPOOL.COMMONPOOL() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Inspecting the JVM Hardware & Common Pool Characteristics
        int availableProcessors = Runtime.getRuntime().availableProcessors();
        ForkJoinPool commonPool = ForkJoinPool.commonPool();

        System.out.println(">>> JVM HARDWARE & FORKJOINPOOL SPECS:");
        System.out.println("  - Available Hardware CPU Cores : " + availableProcessors);
        System.out.println("  - CommonPool Parallelism Level : " + commonPool.getParallelism());
        System.out.println("  - CommonPool Pool Size         : " + commonPool.getPoolSize());
        System.out.println("  - Formula                      : Parallelism = (Hardware Cores - 1)");
        System.out.println("  - Note: The submitting thread (main) also participates in work!\n");

        // 2. Parallel Stream in Action across CommonPool Worker Threads
        System.out.println(">>> 2. Worker Threads participating in IntStream processing:");
        IntStream.rangeClosed(1, 10).parallel().forEach(n -> {
            System.out.println("   [Task " + n + "] Handled by: " + Thread.currentThread().getName());
        });

        System.out.println("\n==========================================================================");
    }
}
