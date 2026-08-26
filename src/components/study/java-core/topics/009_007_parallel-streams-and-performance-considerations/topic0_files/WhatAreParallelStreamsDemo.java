/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 0: What are Parallel Streams? Multi-Core ForkJoin Processing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.List;

public class WhatAreParallelStreamsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT ARE PARALLEL STREAMS? - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> studentRoster = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee",
            "Priya Sharma", "Anish Dey", "Rahul Roy", "Sneha Sen"
        );

        // 1. Sequential Stream: Executed by the main thread exclusively
        System.out.println(">>> 1. Sequential Stream Execution (Single Thread):");
        studentRoster.stream()
            .forEach(name -> System.out.println("   [Thread: " + Thread.currentThread().getName() + "] Processing: " + name));

        // 2. Parallel Stream: Automatically distributed across CPU cores
        System.out.println("\n>>> 2. Parallel Stream Execution (Multi-Threaded ForkJoinPool):");
        studentRoster.parallelStream()
            .forEach(name -> System.out.println("   [Thread: " + Thread.currentThread().getName() + "] Processing: " + name));

        System.out.println("\n>>> HOW PARALLEL STREAMS WORK UNDER THE HOOD:");
        System.out.println("  1. Splitting: Source Spliterator recursively divides dataset into halves.");
        System.out.println("  2. Forking: Each chunk is submitted as a task to ForkJoinPool.commonPool().");
        System.out.println("  3. Joining: Partial results are combined recursively using combiner functions.");
        System.out.println("==========================================================================");
    }
}
