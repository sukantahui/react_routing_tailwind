/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 11: How Streams Use Spliterators for Multi-Threaded Parallel Execution (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.List;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class StreamSpliteratorParallelCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: HOW STREAMS USE SPLITERATORS IN PARALLEL (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> dataset = IntStream.rangeClosed(1, 10).boxed().collect(Collectors.toList());

        System.out.println(">>> 1. Processing Dataset with parallelStream():");
        System.out.println("  Available CPU Common Pool Cores: " + ForkJoinPool.getCommonPoolParallelism());
        System.out.println();

        // Parallel stream utilizes underlying Spliterator.trySplit() automatically:
        dataset.parallelStream().forEach(item -> {
            String threadName = Thread.currentThread().getName();
            System.out.printf("  Processed Item %2d on Thread: %s%n", item, threadName);
        });

        System.out.println("\n>>> HOW PARALLEL STREAMS EXECUTE VIA SPLITERATORS:");
        System.out.println("  1. 'collection.parallelStream()' calls 'collection.spliterator()'.");
        System.out.println("  2. The ForkJoin framework invokes 'spliterator.trySplit()' recursively until chunks reach leaf threshold.");
        System.out.println("  3. Each ForkJoin worker thread consumes its assigned leaf Spliterator using 'tryAdvance()' / 'forEachRemaining()'.");
        System.out.println("  4. Results from all worker threads are merged seamlessly back into the terminal operation!");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 007_007 ITERATORS, SPLITERATORS & FAIL-FAST 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}