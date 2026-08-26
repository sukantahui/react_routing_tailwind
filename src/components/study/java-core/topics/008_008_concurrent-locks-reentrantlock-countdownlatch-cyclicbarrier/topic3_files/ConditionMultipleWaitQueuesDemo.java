/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 3: The Condition Interface: Replacing wait/notify with Multiple Condition Queues
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class BoundedQueueWithConditions<T> {
    private final Object[] items;
    private int count = 0, putIndex = 0, takeIndex = 0;

    private final Lock lock = new ReentrantLock();
    // 2 SEPARATE CONDITION QUEUES BOUND TO THE SAME LOCK:
    private final Condition notFull = lock.newCondition();   // Producer Wait-Queue
    private final Condition notEmpty = lock.newCondition();  // Consumer Wait-Queue

    public BoundedQueueWithConditions(int capacity) {
        this.items = new Object[capacity];
    }

    public void put(T item) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) {
                notFull.await(); // Producer sleeps ONLY in notFull wait-queue!
            }
            items[putIndex] = item;
            if (++putIndex == items.length) putIndex = 0;
            count++;
            // Target ONLY waiting consumers directly (Zero producer wake-up thrashing!):
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    @SuppressWarnings("unchecked")
    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) {
                notEmpty.await(); // Consumer sleeps ONLY in notEmpty wait-queue!
            }
            T item = (T) items[takeIndex];
            if (++takeIndex == items.length) takeIndex = 0;
            count--;
            // Target ONLY waiting producers directly:
            notFull.signal();
            return item;
        } finally {
            lock.unlock();
        }
    }
}

public class ConditionMultipleWaitQueuesDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: Condition INTERFACE & TARGETED SIGNALING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BoundedQueueWithConditions<String> queue = new BoundedQueueWithConditions<>(2);

        Thread producer = new Thread(() -> {
            try {
                queue.put("GST-Invoice-#101");
                queue.put("GST-Invoice-#102");
                System.out.println(">>> Producer placed 2 items in queue via notFull.signal()!");
            } catch (InterruptedException ignored) {}
        });

        producer.start();
        producer.join();

        System.out.println("\n==========================================================================");
    }
}