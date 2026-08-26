/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 4: Configuring Common Pool Parallelism & Custom ForkJoinPool Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.IntStream;

public class ConfiguringPoolParallelismDemo {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: PARALLELISM CONFIGURATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. System Property for JVM-wide CommonPool Parallelism:
        // System.setProperty("java.util.concurrent.ForkJoinPool.common.parallelism", "8");
        // Must be set BEFORE ForkJoinPool.commonPool() is initialized.
        System.out.println("1. Current CommonPool Parallelism: " + ForkJoinPool.commonPool().getParallelism());

        // 2. Running a Parallel Stream inside an Isolated Custom ForkJoinPool
        // This isolates the parallel stream so it does NOT interfere with the global commonPool!
        int customThreads = 3;
        ForkJoinPool customPool = new ForkJoinPool(customThreads);

        System.out.println("\n2. Submitting Parallel Stream to Isolated Custom ForkJoinPool (" + customThreads + " threads):");
        List<String> studentList = List.of("Swadeep", "Tuhina", "Abhronila", "Debangshu", "Priya", "Anish");

        customPool.submit(() -> {
            studentList.parallelStream().forEach(name -> {
                System.out.println("   [Thread: " + Thread.currentThread().getName() + "] Processing: " + name);
            });
        }).get(); // Block until complete

        customPool.shutdown();

        System.out.println("\n==========================================================================");
    }
}
