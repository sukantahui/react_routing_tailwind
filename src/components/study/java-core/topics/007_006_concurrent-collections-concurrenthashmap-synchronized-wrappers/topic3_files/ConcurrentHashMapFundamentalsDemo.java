/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 3: java.util.concurrent.ConcurrentHashMap: High-Performance Lock-Free Concurrency
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class ConcurrentHashMapFundamentalsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: ConcurrentHashMap FUNDAMENTALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentMap<String, Integer> admissionCounters = new ConcurrentHashMap<>();

        // High-concurrency worker threads mutating map simultaneously:
        Thread worker1 = new Thread(() -> {
            for (int i = 0; i < 5000; i++) {
                admissionCounters.merge("Barrackpore", 1, Integer::sum);
            }
        });

        Thread worker2 = new Thread(() -> {
            for (int i = 0; i < 5000; i++) {
                admissionCounters.merge("Barrackpore", 1, Integer::sum);
            }
        });

        worker1.start();
        worker2.start();
        worker1.join();
        worker2.join();

        System.out.println(">>> 1. Thread-Safe Atomic Increments via ConcurrentHashMap:");
        System.out.println("  Total Barrackpore Enrollments: " + admissionCounters.get("Barrackpore") + " (Guaranteed 10,000 without data loss!)");

        System.out.println("\n>>> WHY ConcurrentHashMap IS THE ENTERPRISE GOLD STANDARD:");
        System.out.println("  1. 100% Thread-Safe : Guaranteed thread-safety across all read and write methods without data corruption.");
        System.out.println("  2. Fine-Grained Locking: Only locks the specific bucket head node being modified; all other buckets remain unlocked!");
        System.out.println("  3. Lock-Free Reads  : 'get()' never acquires locks and executes at hardware memory speed.");
        System.out.println("  4. High Scalability : Scales linearly with available CPU cores.");

        System.out.println("\n==========================================================================");
    }
}