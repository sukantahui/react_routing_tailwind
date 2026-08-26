/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 6: PriorityQueue Operations: O(log n) Sift-Up (offer) & Sift-Down (poll)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.PriorityQueue;

public class PriorityQueueSiftOperationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: PriorityQueue SIFT-UP & SIFT-DOWN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        PriorityQueue<Integer> pq = new PriorityQueue<>();

        // 1. INSERTION & SIFT-UP (siftUp / siftUpUsingComparator):
        // Element is added at tail, then swapped UP with its parent until min-heap property is satisfied:
        pq.offer(30);
        pq.offer(20);
        pq.offer(10); // Sifts up to root index 0!

        System.out.println(">>> 1. Sift-Up on Insertion (offer()):");
        System.out.println("  Top of Heap (peek()) : " + pq.peek() + " (O(1) instant read)");

        // 2. EXTRACTION & SIFT-DOWN (siftDown / siftDownUsingComparator):
        // Root is removed, last element moves to root, then swapped DOWN with smaller child:
        int extractedMin = pq.poll(); // Removes 10, sifts down to restore heap!

        System.out.println("\n>>> 2. Sift-Down on Extraction (poll()):");
        System.out.println("  Extracted Min Element : " + extractedMin);
        System.out.println("  New Root after Sift-Down: " + pq.peek());

        System.out.println("\n>>> TIME COMPLEXITY OF HEAP OPERATIONS:");
        System.out.println("  - peek()  : O(1)     (Directly reads array[0])");
        System.out.println("  - offer() : O(log n) (Sift-up tree height)");
        System.out.println("  - poll()  : O(log n) (Sift-down tree height)");
        System.out.println("  - remove(Object): O(n) (Requires linear scan to find item before sifting)");

        System.out.println("\n==========================================================================");
    }
}