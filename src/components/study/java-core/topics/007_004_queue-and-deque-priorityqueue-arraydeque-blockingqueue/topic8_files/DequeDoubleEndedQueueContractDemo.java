/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 8: The java.util.Deque (Double-Ended Queue) Interface: Head & Tail Operations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Deque;

public class DequeDoubleEndedQueueContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: java.util.Deque (DOUBLE-ENDED QUEUE) CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Deque<String> dispatcher = new ArrayDeque<>();

        // 1. Ingesting at Both Ends:
        dispatcher.addFirst("Regular Task 1");
        dispatcher.addLast("Low Priority Task 2");
        dispatcher.addFirst("VIP Emergency Task 0 (Jumped to Head!)");

        System.out.println(">>> 1. Deque State after Dual-End Ingestion:");
        System.out.println("  " + dispatcher);

        // 2. Extracting from Both Ends:
        System.out.println("\n>>> 2. Dual-End Extractions:");
        System.out.println("  Removed from Head (removeFirst()) : " + dispatcher.removeFirst());
        System.out.println("  Removed from Tail (removeLast())  : " + dispatcher.removeLast());
        System.out.println("  Remaining in Deque                : " + dispatcher);

        System.out.println("\n>>> THE 3 PERSONAS OF java.util.Deque<E>:");
        System.out.println("  1. FIFO Queue : 'offerLast(e)' + 'pollFirst()' (First-In, First-Out).");
        System.out.println("  2. LIFO Stack : 'push(e)' + 'pop()' (Last-In, First-Out).");
        System.out.println("  3. Double Queue: Ingest and extract at both head and tail dynamically.");

        System.out.println("\n==========================================================================");
    }
}