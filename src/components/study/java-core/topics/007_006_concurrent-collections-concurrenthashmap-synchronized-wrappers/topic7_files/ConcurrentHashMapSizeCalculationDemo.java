/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 7: ConcurrentHashMap Size Calculation: baseCount & CounterCell[] (LongAdder Pattern)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapSizeCalculationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: ConcurrentHashMap SIZE & CounterCell[] - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // size() vs mappingCount():
        int intSize = map.size();
        long longSize = map.mappingCount(); // Recommended in Java 8+ for high volume collections

        System.out.println(">>> 1. Size Queries:");
        System.out.println("  size()         : " + intSize);
        System.out.println("  mappingCount() : " + longSize + " (Long value preventing 32-bit overflow)");

        System.out.println("\n>>> HOW ConcurrentHashMap COUNTS ELEMENTS CONCURRENTLY (LongAdder Pattern):");
        System.out.println("  - Problem: If 64 threads all update a single 'volatile long size' with atomic CAS, they will stall each other (CAS contention storm).");
        System.out.println("  - Solution (Striped Counters):");
        System.out.println("    1. Under LOW contention  : Threads update 'private transient volatile long baseCount' via CAS.");
        System.out.println("    2. Under HIGH contention : Threads distribute increments across a striped 'CounterCell[] counterCells' array based on thread hash.");
        System.out.println("    3. During 'size() / mappingCount()': Java computes: 'sum = baseCount + sum(counterCells[i].value)'.");
        System.out.println("  - Result: Blazingly fast concurrent size updates with zero global lock bottlenecks!");

        System.out.println("\n==========================================================================");
    }
}