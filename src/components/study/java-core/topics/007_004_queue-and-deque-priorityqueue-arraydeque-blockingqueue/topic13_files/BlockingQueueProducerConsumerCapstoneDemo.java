/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 13: Introduction to java.util.concurrent.BlockingQueue: Producer-Consumer Concurrency (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

public class BlockingQueueProducerConsumerCapstoneDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: BlockingQueue PRODUCER-CONSUMER (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Bounded BlockingQueue with capacity of 2 slots:
        BlockingQueue<String> messageBus = new ArrayBlockingQueue<>(2);

        // 1. Thread 1: PRODUCER (puts messages, blocks if queue is full):
        Thread producer = new Thread(() -> {
            try {
                String[] batch = {"Enrollment: Swadeep", "Enrollment: Tuhina", "Enrollment: Abhronila"};
                for (String msg : batch) {
                    System.out.println("  [PRODUCER] Attempting to put: " + msg);
                    messageBus.put(msg); // BLOCKS if queue is full until space becomes available!
                    System.out.println("  [PRODUCER SUCCESS] Put: " + msg);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // 2. Thread 2: CONSUMER (takes messages, blocks if queue is empty):
        Thread consumer = new Thread(() -> {
            try {
                for (int i = 0; i < 3; i++) {
                    Thread.sleep(250); // Simulating work processing delay
                    String item = messageBus.take(); // BLOCKS if queue is empty until item is placed!
                    System.out.println("    >>> [CONSUMER PROCESSED] " + item);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();

        producer.join();
        consumer.join();

        System.out.println("\n>>> THE BLOCKING QUEUE CONTRACT (java.util.concurrent.BlockingQueue):");
        System.out.println("  1. 'put(e)' : Blocks indefinitely until buffer has available capacity.");
        System.out.println("  2. 'take()' : Blocks indefinitely until buffer has an element available.");
        System.out.println("  3. 'offer(e, time, unit)' / 'poll(time, unit)': Timed blocking methods.");
        System.out.println("  4. Standard Implementations: ArrayBlockingQueue (bounded array), LinkedBlockingQueue (linked nodes).");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 007_004 QUEUE, DEQUE & PRIORITYQUEUE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}