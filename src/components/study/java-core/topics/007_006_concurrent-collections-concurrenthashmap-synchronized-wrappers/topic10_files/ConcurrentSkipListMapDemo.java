/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 10: java.util.concurrent.ConcurrentSkipListMap: Lock-Free Sorted Map Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ConcurrentNavigableMap;
import java.util.concurrent.ConcurrentSkipListMap;

public class ConcurrentSkipListMapDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: ConcurrentSkipListMap (LOCK-FREE SORTED MAP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // ConcurrentNavigableMap (Thread-safe equivalent of TreeMap!):
        ConcurrentNavigableMap<Integer, String> studentLedger = new ConcurrentSkipListMap<>();

        studentLedger.put(105, "Debangshu Mukherjee");
        studentLedger.put(101, "Swadeep Paul");
        studentLedger.put(103, "Tuhina Das");
        studentLedger.put(102, "Abhronila Das");

        System.out.println(">>> 1. Lock-Free Sorted Map Traversal:");
        studentLedger.forEach((roll, name) ->
                System.out.printf("  Roll: %d -> %s%n", roll, name));

        // Range Queries concurrently:
        System.out.println("\n>>> 2. Concurrent Range Query (Rolls 101 to 103):");
        System.out.println("  " + studentLedger.subMap(101, true, 103, true));

        System.out.println("\n>>> HOW SKIP LISTS ACHIEVE LOCK-FREE SORTED CONCURRENCY:");
        System.out.println("  - Why NOT a Concurrent TreeMap? Balancing a Red-Black Tree requires rotating multiple tree nodes simultaneously, which is impossible to do with lock-free atomic CAS.");
        System.out.println("  - Skip List Data Structure    : A multi-level probabilistic linked list (express lanes).");
        System.out.println("  - Lock-Free Mutation          : Splicing nodes into linked lists uses atomic CAS on node pointers without locking the tree!");
        System.out.println("  - Performance                 : Guaranteed O(log n) time for put, get, remove, and range queries.");

        System.out.println("\n==========================================================================");
    }
}