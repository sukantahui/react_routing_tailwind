/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 7: Building a Max-Heap Using Collections.reverseOrder() / Custom Reverse Comparators
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Collections;
import java.util.PriorityQueue;
import java.util.Queue;

public class PriorityQueueMaxHeapReverseOrderDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: BUILDING A MAX-HEAP IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. DEFAULT MIN-HEAP (Lowest number extracted first):
        Queue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(4500);
        minHeap.offer(1200);
        minHeap.offer(9800);

        System.out.println(">>> 1. Default Min-Heap Dispatch (Lowest Fee First):");
        while (!minHeap.isEmpty()) {
            System.out.println("  Min Polled : ₹" + minHeap.poll());
        }

        // 2. REVERSE MAX-HEAP (Highest number extracted first via Collections.reverseOrder()):
        Queue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.offer(4500);
        maxHeap.offer(1200);
        maxHeap.offer(9800);

        System.out.println("\n>>> 2. Max-Heap Dispatch (Collections.reverseOrder() - Highest Fee First):");
        while (!maxHeap.isEmpty()) {
            System.out.println("  Max Polled : ₹" + maxHeap.poll());
        }

        System.out.println("\n>>> REAL-WORLD MAX-HEAP USE CASES:");
        System.out.println("  1. Top-K Largest Elements: Finding the highest revenue branches or highest student scores in a stream.");
        System.out.println("  2. CPU Process Schedulers: Highest priority CPU threads dispatched first.");
        System.out.println("  3. Financial Trading Engines: Highest bidding buyers matched first with sellers.");

        System.out.println("\n==========================================================================");
    }
}