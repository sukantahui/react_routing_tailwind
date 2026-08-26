/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 16: java.util.LinkedHashMap: Insertion Order vs Access Order Modes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapOrderingModesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: LinkedHashMap INSERTION vs ACCESS ORDER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. DEFAULT: INSERTION-ORDER MODE (accessOrder = false):
        Map<String, String> insertionOrderMap = new LinkedHashMap<>();
        insertionOrderMap.put("BRK-1", "Swadeep");
        insertionOrderMap.put("NAI-2", "Tuhina");
        insertionOrderMap.put("SHY-3", "Abhronila");

        // Accessing first key:
        insertionOrderMap.get("BRK-1");

        System.out.println(">>> 1. Insertion-Order Mode (Accessing 'BRK-1' does NOT change order):");
        System.out.println("  " + insertionOrderMap);

        // 2. ACCESS-ORDER MODE (accessOrder = true via 3-arg constructor):
        // Constructor: (initialCapacity, loadFactor, accessOrder)
        Map<String, String> accessOrderMap = new LinkedHashMap<>(16, 0.75f, true);
        accessOrderMap.put("BRK-1", "Swadeep");
        accessOrderMap.put("NAI-2", "Tuhina");
        accessOrderMap.put("SHY-3", "Abhronila");

        System.out.println("\n>>> 2. Access-Order Mode Before Lookups:");
        System.out.println("  " + accessOrderMap);

        // Accessing 'BRK-1' and 'NAI-2':
        accessOrderMap.get("BRK-1"); // Moves 'BRK-1' to the tail (Most Recently Used)!
        accessOrderMap.get("NAI-2"); // Moves 'NAI-2' to the tail!

        System.out.println("\n>>> 3. Access-Order Mode After get('BRK-1') and get('NAI-2'):");
        System.out.println("  " + accessOrderMap + " ('SHY-3' is now Least Recently Used at the Head!)");

        System.out.println("\n>>> HOW LinkedHashMap ACHIEVES ACCESS ORDERING:");
        System.out.println("  1. Extends 'HashMap.Node' into 'LinkedHashMap.Entry' which adds 'before' and 'after' pointers.");
        System.out.println("  2. When 'get(key)' is invoked with 'accessOrder=true', the node is unlinked from its current position and re-linked at the TAIL.");
        System.out.println("  3. The HEAD of the doubly linked list perpetually holds the LEAST RECENTLY USED (LRU) entry!");

        System.out.println("\n==========================================================================");
    }
}