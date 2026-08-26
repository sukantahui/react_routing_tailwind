/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 10: Classic Problem: Thread-Safe Bounded Buffer / Producer-Consumer Queue (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.LinkedList;
import java.util.Queue;

// 1. THREAD-SAFE BOUNDED BUFFER IMPLEMENTATION:
class BoundedBlockingQueue<T> {

    private final Queue<T> buffer = new LinkedList<>();
    private final int capacity;
    private final Object lock = new Object();

    public BoundedBlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    // PRODUCER METHOD (Blocks if buffer is full):
    public void put(T item) throws InterruptedException {
        synchronized (lock) {
            // GOLDEN RULE: Wait while buffer is FULL:
            while (buffer.size() == capacity) {
                System.out.printf("  [Producer %s] Buffer is FULL (size: %d/%d). Waiting...%n",
                        Thread.currentThread().getName(), buffer.size(), capacity);
                lock.wait(); // Releases lock and waits for consumer to take an item!
            }

            buffer.add(item);
            System.out.printf(">>> [Producer %s] PUT item: %s (Buffer size: %d/%d)%n",
                    Thread.currentThread().getName(), item, buffer.size(), capacity);

            // Signal consumers that an item is available:
            lock.notifyAll();
        }
    }

    // CONSUMER METHOD (Blocks if buffer is empty):
    public T take() throws InterruptedException {
        synchronized (lock) {
            // GOLDEN RULE: Wait while buffer is EMPTY:
            while (buffer.isEmpty()) {
                System.out.printf("  [Consumer %s] Buffer is EMPTY. Waiting...%n",
                        Thread.currentThread().getName());
                lock.wait(); // Releases lock and waits for producer to put an item!
            }

            T item = buffer.remove();
            System.out.printf("<<< [Consumer %s] TOOK item: %s (Buffer size: %d/%d)%n",
                    Thread.currentThread().getName(), item, buffer.size(), capacity);

            // Signal producers that a slot has freed up:
            lock.notifyAll();
            return item;
        }
    }
}

public class ProducerConsumerBoundedBufferCapstoneDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: PRODUCER-CONSUMER BOUNDED BUFFER CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Bounded buffer with capacity of 2 items:
        BoundedBlockingQueue<String> invoiceQueue = new BoundedBlockingQueue<>(2);

        // 2 Producers adding invoices:
        Thread p1 = new Thread(() -> {
            try {
                invoiceQueue.put("GST-INV-101");
                invoiceQueue.put("GST-INV-102");
                invoiceQueue.put("GST-INV-103"); // Will block until consumer drains!
            } catch (InterruptedException ignored) {}
        }, "P1");

        // 2 Consumers consuming invoices:
        Thread c1 = new Thread(() -> {
            try {
                Thread.sleep(400); // Delay consumer start to demonstrate blocking on full
                invoiceQueue.take();
                invoiceQueue.take();
                invoiceQueue.take();
            } catch (InterruptedException ignored) {}
        }, "C1");

        p1.start();
        c1.start();

        p1.join();
        c1.join();

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_004 INTER-THREAD COMMUNICATION 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}