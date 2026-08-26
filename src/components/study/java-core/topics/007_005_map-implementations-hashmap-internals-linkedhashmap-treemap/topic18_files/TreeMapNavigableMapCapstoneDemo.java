/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 18: java.util.TreeMap: Red-Black Tree Map Sorted by Key & NavigableMap Operations (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.NavigableMap;
import java.util.TreeMap;

public class TreeMapNavigableMapCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 18: TreeMap & NavigableMap ARCHITECTURE (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        NavigableMap<Integer, String> studentLedger = new TreeMap<>();
        studentLedger.put(105, "Debangshu Mukherjee (Ichapur)");
        studentLedger.put(101, "Swadeep Paul (Barrackpore)");
        studentLedger.put(103, "Tuhina Das (Naihati)");
        studentLedger.put(102, "Abhronila Das (Shyamnagar)");

        System.out.println(">>> 1. Automatic Key-Sorted In-Order Traversal:");
        studentLedger.forEach((roll, name) ->
                System.out.printf("  Roll: %d -> %s%n", roll, name));

        // 2. NavigableMap Proximity Lookups:
        System.out.println("\n>>> 2. Proximity Range Queries around Roll 103:");
        System.out.println("  firstKey()           : " + studentLedger.firstKey());
        System.out.println("  lastKey()            : " + studentLedger.lastKey());
        System.out.println("  lowerKey(103)  (<103): " + studentLedger.lowerKey(103));
        System.out.println("  floorKey(103) (<=103): " + studentLedger.floorKey(103));
        System.out.println("  ceilingKey(104) (>=104): " + studentLedger.ceilingKey(104));
        System.out.println("  higherKey(103) (>103): " + studentLedger.higherKey(103));

        // 3. SubMap Slicing:
        System.out.println("\n>>> 3. SubMap Range Slice [Roll 101 to 103 Inclusive]:");
        System.out.println("  " + studentLedger.subMap(101, true, 103, true));

        System.out.println("\n>>> 4. Reverse View (descendingMap()):");
        System.out.println("  " + studentLedger.descendingMap());

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 007_005 MAP IMPLEMENTATIONS & HASHMAP INTERNALS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}