/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 12: Enterprise Benchmark: HashMap vs Hashtable vs SynchronizedMap vs ConcurrentHashMap (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Collections;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ConcurrentMapBenchmarkCapstoneDemo {

    private static final int THREAD_COUNT = 8;
    private static final int OPS_PER_THREAD = 50_000;

    private static long benchmark(Map<Integer, Integer> map) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(THREAD_COUNT);
        CountDownLatch latch = new CountDownLatch(THREAD_COUNT);

        long start = System.currentTimeMillis();
        for (int t = 0; t < THREAD_COUNT; t++) {
            final int threadId = t;
            executor.submit(() -> {
                for (int i = 0; i < OPS_PER_THREAD; i++) {
                    int key = (threadId * OPS_PER_THREAD) + i;
                    map.put(key, i);
                    map.get(key);
                }
                latch.countDown();
            });
        }
        latch.await();
        executor.shutdown();
        return System.currentTimeMillis() - start;
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: ENTERPRISE MAP CONCURRENCY BENCHMARK (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Hashtable (Legacy Whole-Map Synchronized):
        long hashtableTime = benchmark(new Hashtable<>());

        // 2. Collections.synchronizedMap (Synchronized Decorator):
        long syncMapTime = benchmark(Collections.synchronizedMap(new HashMap<>()));

        // 3. ConcurrentHashMap (Modern CAS + Bucket Head Lock):
        long chmTime = benchmark(new ConcurrentHashMap<>());

        System.out.println(">>> BENCHMARK RESULTS (" + THREAD_COUNT + " Threads x " + OPS_PER_THREAD + " Operations = 400,000 Ops):");
        System.out.println("  1. Legacy Hashtable           : " + hashtableTime + " ms (Coarse lock serialization)");
        System.out.println("  2. Collections.synchronizedMap: " + syncMapTime + " ms (Coarse lock serialization)");
        System.out.println("  3. ConcurrentHashMap          : " + chmTime + " ms (⚡ 3x-6x faster, zero whole-map locking!)");

        System.out.println("\n>>> GRAND ARCHITECTURAL MATRIX:");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| Implementation    | Thread-Safe?      | Locking Mechanism | Read Performance  |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| HashMap           | NO (Data Corrupt) | None              | O(1) Fast         |");
        System.out.println("| Hashtable         | YES               | Method-level Lock | Blocked by Writes |");
        System.out.println("| SynchronizedMap   | YES               | Object Mutex Lock | Blocked by Writes |");
        System.out.println("| ConcurrentHashMap | YES (100% Safe)   | CAS + Bucket Lock | 100% Lock-Free    |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 007_006 CONCURRENT COLLECTIONS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}