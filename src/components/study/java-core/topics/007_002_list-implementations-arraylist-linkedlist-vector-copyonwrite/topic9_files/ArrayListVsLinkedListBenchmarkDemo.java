/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 9: Comprehensive Head-to-Head Benchmark: ArrayList vs LinkedList (CPU Cache Locality)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ArrayListVsLinkedListBenchmarkDemo {

    private static final int ITERATIONS = 100_000;

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: HEAD-TO-HEAD BENCHMARK: ArrayList vs LinkedList - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> arrayList = new ArrayList<>();
        List<Integer> linkedList = new LinkedList<>();

        // 1. BENCHMARK 1: SEQUENTIAL APPENDS (add()):
        long t1 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) arrayList.add(i);
        long t2 = System.currentTimeMillis();
        long alAppendTime = t2 - t1;

        long t3 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) linkedList.add(i);
        long t4 = System.currentTimeMillis();
        long llAppendTime = t4 - t3;

        System.out.println(">>> 1. 100,000 Sequential Appends:");
        System.out.println("  ArrayList  : " + alAppendTime + " ms (Fast contiguous allocation)");
        System.out.println("  LinkedList : " + llAppendTime + " ms (100,000 separate Node heap allocations!)");

        // 2. BENCHMARK 2: SEQUENTIAL ITERATION (for-each sum):
        long t5 = System.currentTimeMillis();
        long alSum = 0;
        for (int v : arrayList) alSum += v;
        long t6 = System.currentTimeMillis();
        long alIterTime = t6 - t5;

        long t7 = System.currentTimeMillis();
        long llSum = 0;
        for (int v : linkedList) llSum += v;
        long t8 = System.currentTimeMillis();
        long llIterTime = t8 - t7;

        System.out.println("\n>>> 2. 100,000 Sequential Iteration / Traversal:");
        System.out.println("  ArrayList  : " + alIterTime + " ms (CPU L1/L2 Cache Prefetching Hits!)");
        System.out.println("  LinkedList : " + llIterTime + " ms (Pointer Chasing & CPU Cache Misses!)");

        System.out.println("\n>>> THE HARDWARE REALITY: CPU CACHE LINES (64 Bytes):");
        System.out.println("  - Modern CPUs load memory in 64-byte Cache Lines.");
        System.out.println("  - ArrayList is contiguous; loading one element loads the next 8-16 elements into CPU cache for free!");
        System.out.println("  - LinkedList nodes are scattered randomly across heap memory, forcing a cold RAM fetch on every node!");

        System.out.println("\n==========================================================================");
    }
}