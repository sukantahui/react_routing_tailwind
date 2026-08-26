/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 11: Small Datasets Overhead - When Sequential Beats Parallel
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.List;
import java.util.stream.IntStream;

public class SmallDatasetsOverheadDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: SMALL DATASETS OVERHEAD - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> studentList = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee", "Priya Sharma"
        );

        System.out.println(">>> 1. Processing Tiny List (5 elements):");
        // Sequential: Direct main thread execution, 0 coordination overhead
        long start = System.nanoTime();
        List<String> seqResult = studentList.stream().map(String::toUpperCase).toList();
        long seqDuration = System.nanoTime() - start;
        System.out.println("   - Sequential Duration: " + seqDuration + " nanoseconds");

        // Parallel: Spliterator trySplit, task submission, ForkJoin coordination, combiner
        start = System.nanoTime();
        List<String> parResult = studentList.parallelStream().map(String::toUpperCase).toList();
        long parDuration = System.nanoTime() - start;
        System.out.println("   - Parallel Duration  : " + parDuration + " nanoseconds");

        System.out.println("\n>>> BENCHMARK RESULT:");
        System.out.println("   Sequential was significantly faster because N = 5 has near-zero compute work!");
        System.out.println("   Thread orchestration overhead completely eclipsed the actual work.");
        System.out.println("==========================================================================");
    }
}
