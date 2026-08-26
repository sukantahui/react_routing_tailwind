/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 5: High-Performance Concurrent Cache: 10x Read Throughput with ReadWriteLock
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

class ThreadSafeStudentCache {
    private final Map<String, String> cache = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();

    public String get(String key) {
        readLock.lock();
        try {
            return cache.get(key); // High concurrency: 1,000 threads can read simultaneously!
        } finally {
            readLock.unlock();
        }
    }

    public void put(String key, String value) {
        writeLock.lock();
        try {
            cache.put(key, value); // Exclusive write
        } finally {
            writeLock.unlock();
        }
    }
}

public class ReadWriteLockCacheBenchmarkDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: ReadWriteLock HIGH-THROUGHPUT CACHE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ThreadSafeStudentCache studentCache = new ThreadSafeStudentCache();
        studentCache.put("STD-101", "Swadeep Paul [GST Grade A]");
        studentCache.put("STD-102", "Tuhina Das [Tax Grade A+]");

        System.out.println(">>> Cache Populated. Reading concurrently:");
        System.out.println("  STD-101: " + studentCache.get("STD-101"));
        System.out.println("  STD-102: " + studentCache.get("STD-102"));

        System.out.println("\n>>> WHEN TO USE ReadWriteLock IN PRODUCTION:");
        System.out.println("  - Ideal for READ-HEAVY architectures (e.g. 95% reads, 5% writes).");
        System.out.println("  - Caution: In write-heavy architectures, ReentrantLock or ConcurrentHashMap is faster due to ReadWriteLock tracking overhead.");

        System.out.println("\n==========================================================================");
    }
}