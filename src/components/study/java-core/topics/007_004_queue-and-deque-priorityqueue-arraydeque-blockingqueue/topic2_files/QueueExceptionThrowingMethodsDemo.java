/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 2: Exception-Throwing Queue Methods: add(e), remove(), and element()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.NoSuchElementException;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;

public class QueueExceptionThrowingMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: EXCEPTION-THROWING QUEUE METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Calling remove() on an EMPTY Queue throws NoSuchElementException:
        Queue<String> emptyQueue = new ArrayDeque<>();
        System.out.println(">>> 1. Invoking remove() on empty queue:");
        try {
            emptyQueue.remove();
        } catch (NoSuchElementException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] remove() threw NoSuchElementException!");
        }

        // 2. Calling element() on an EMPTY Queue throws NoSuchElementException:
        System.out.println("\n>>> 2. Invoking element() on empty queue:");
        try {
            emptyQueue.element();
        } catch (NoSuchElementException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] element() threw NoSuchElementException!");
        }

        // 3. Calling add() on a FULL Bounded Queue throws IllegalStateException:
        Queue<Integer> boundedQueue = new ArrayBlockingQueue<>(2); // Max capacity 2
        boundedQueue.add(101);
        boundedQueue.add(102);

        System.out.println("\n>>> 3. Invoking add() on full bounded queue (Capacity 2):");
        try {
            boundedQueue.add(103); // Overflow!
        } catch (IllegalStateException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] add() threw IllegalStateException (Queue full)!");
        }

        System.out.println("\n==========================================================================");
    }
}