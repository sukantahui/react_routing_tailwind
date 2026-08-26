/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 8: 3. java.util.Queue & Deque: FIFO / LIFO Buffers & Task Dispatching
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.PriorityQueue;
import java.util.Queue;

public class QueueAndDequeContractBehaviorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: java.util.Queue & Deque CONTRACTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. STANDARD FIFO QUEUE (First-In, First-Out via ArrayDeque):
        Queue<String> ticketCounter = new ArrayDeque<>();
        ticketCounter.offer("Swadeep (Token 1)");
        ticketCounter.offer("Tuhina (Token 2)");
        ticketCounter.offer("Abhronila (Token 3)");

        System.out.println(">>> 1. FIFO Queue Processing (ArrayDeque):");
        System.out.println("  Next in Line (peek()) : " + ticketCounter.peek());
        System.out.println("  Served & Removed (poll()): " + ticketCounter.poll());
        System.out.println("  Remaining in Line     : " + ticketCounter);

        // 2. DOUBLE-ENDED QUEUE (Deque as LIFO Stack):
        Deque<String> undoStack = new ArrayDeque<>();
        undoStack.push("Action 1: Type text");
        undoStack.push("Action 2: Format bold");
        undoStack.push("Action 3: Insert table");

        System.out.println("\n>>> 2. LIFO Stack Processing (Deque):");
        System.out.println("  Top of Stack (peek()) : " + undoStack.peek());
        System.out.println("  Undone Action (pop()) : " + undoStack.pop());
        System.out.println("  Remaining Stack       : " + undoStack);

        // 3. PRIORITY QUEUE (Min-Heap Ordering):
        Queue<Integer> feePriorityQueue = new PriorityQueue<>();
        feePriorityQueue.offer(9800);
        feePriorityQueue.offer(1200);
        feePriorityQueue.offer(4500);

        System.out.println("\n>>> 3. Priority Queue (Processed in Ascending Numerical Priority):");
        while (!feePriorityQueue.isEmpty()) {
            System.out.println("  Dispatched Priority Item: ₹" + feePriorityQueue.poll());
        }

        System.out.println("\n==========================================================================");
    }
}