/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 11: Benchmark: Why ArrayDeque Outperforms Stack (LIFO) and LinkedList (FIFO)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class ArrayDequeSuperiorityBenchmarkDemo {

    private static final int ITERATIONS = 1_000_000;

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: ArrayDeque BENCHMARK vs Stack & LinkedList - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. BENCHMARK 1: LIFO STACK (Stack vs ArrayDeque):
        Stack<Integer> legacyStack = new Stack<>();
        long t1 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) legacyStack.push(i);
        while (!legacyStack.isEmpty()) legacyStack.pop();
        long t2 = System.currentTimeMillis();
        long stackTime = t2 - t1;

        Deque<Integer> arrayDequeStack = new ArrayDeque<>();
        long t3 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) arrayDequeStack.push(i);
        while (!arrayDequeStack.isEmpty()) arrayDequeStack.pop();
        long t4 = System.currentTimeMillis();
        long adStackTime = t4 - t3;

        System.out.println(">>> 1. LIFO Stack Benchmark (1,000,000 Push & Pop operations):");
        System.out.println("  Legacy Stack (Synchronized) : " + stackTime + " ms (Slow lock acquisition)");
        System.out.println("  Modern ArrayDeque           : " + adStackTime + " ms (3x-4x faster, zero locking!)");

        // 2. BENCHMARK 2: FIFO QUEUE (LinkedList vs ArrayDeque):
        Queue<Integer> linkedQueue = new LinkedList<>();
        long t5 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) linkedQueue.offer(i);
        while (!linkedQueue.isEmpty()) linkedQueue.poll();
        long t6 = System.currentTimeMillis();
        long lqTime = t6 - t5;

        Queue<Integer> adQueue = new ArrayDeque<>();
        long t7 = System.currentTimeMillis();
        for (int i = 0; i < ITERATIONS; i++) adQueue.offer(i);
        while (!adQueue.isEmpty()) adQueue.poll();
        long t8 = System.currentTimeMillis();
        long adQueueTime = t8 - t7;

        System.out.println("\n>>> 2. FIFO Queue Benchmark (1,000,000 Offer & Poll operations):");
        System.out.println("  LinkedList Queue : " + lqTime + " ms (1 million Node allocations & GC churn)");
        System.out.println("  ArrayDeque Queue : " + adQueueTime + " ms (Contiguous circular buffer)");

        System.out.println("\n==========================================================================");
    }
}