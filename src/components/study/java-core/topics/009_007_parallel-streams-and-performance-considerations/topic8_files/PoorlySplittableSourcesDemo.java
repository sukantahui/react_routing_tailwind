/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 8: Poorly Splittable Data Sources - LinkedList vs ArrayList Benchmark
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class PoorlySplittableSourcesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: SPLITABILITY BENCHMARK (ARRAYLIST VS LINKEDLIST) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int size = 500_000;
        List<Integer> arrayList = new ArrayList<>(size);
        List<Integer> linkedList = new LinkedList<>();

        for (int i = 0; i < size; i++) {
            arrayList.add(i);
            linkedList.add(i);
        }

        // 1. Benchmarking Parallel ArrayList (O(1) Splitability)
        long start = System.currentTimeMillis();
        long arrayListSum = arrayList.parallelStream().mapToLong(x -> x * 2L).sum();
        long arrayListDuration = System.currentTimeMillis() - start;
        System.out.println("1. ArrayList Parallel Duration : " + arrayListDuration + " ms (Sum: " + arrayListSum + ")");

        // 2. Benchmarking Parallel LinkedList (O(N) Poor Splitability)
        start = System.currentTimeMillis();
        long linkedListSum = linkedList.parallelStream().mapToLong(x -> x * 2L).sum();
        long linkedListDuration = System.currentTimeMillis() - start;
        System.out.println("2. LinkedList Parallel Duration: " + linkedListDuration + " ms (Sum: " + linkedListSum + ")");

        System.out.println("\n>>> ARCHITECTURAL VERDICT:");
        System.out.println("  - ArrayList: Spliterator splits instantly at array midpoints.");
        System.out.println("  - LinkedList: Spliterator must traverse N/2 pointers sequentially, creating a massive bottleneck.");
        System.out.println("==========================================================================");
    }
}
