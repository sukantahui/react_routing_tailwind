/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 3: Safe Special-Value Queue Methods: offer(e), poll(), and peek()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;

public class QueueSpecialValueMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: SPECIAL-VALUE QUEUE METHODS (offer, poll, peek) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. poll() on EMPTY Queue returns null (NO Exception):
        Queue<String> emptyQueue = new ArrayDeque<>();
        String polledItem = emptyQueue.poll(); // Returns null safely!
        String peekedItem = emptyQueue.peek(); // Returns null safely!

        System.out.println(">>> 1. Inspecting Empty Queue via Special-Value APIs:");
        System.out.println("  poll() result : " + polledItem + " (Safe null return, zero exceptions)");
        System.out.println("  peek() result : " + peekedItem + " (Safe null return, zero exceptions)");

        // 2. offer() on a FULL Bounded Queue returns false (NO Exception):
        Queue<Integer> boundedQueue = new ArrayBlockingQueue<>(2);
        boolean inserted1 = boundedQueue.offer(101);
        boolean inserted2 = boundedQueue.offer(102);
        boolean insertedOverflow = boundedQueue.offer(103); // Returns false!

        System.out.println("\n>>> 2. Ingesting into Bounded Queue (Capacity 2):");
        System.out.println("  offer(101) status      : " + inserted1);
        System.out.println("  offer(102) status      : " + inserted2);
        System.out.println("  offer(103) on full cap : " + insertedOverflow + " (Gracefully returned false!)");

        // 3. Normal Workflow:
        System.out.println("\n>>> 3. Processing Bounded Queue:");
        while (boundedQueue.peek() != null) {
            System.out.println("  Peeked next: " + boundedQueue.peek() + " | Polled: " + boundedQueue.poll());
        }

        System.out.println("\n==========================================================================");
    }
}