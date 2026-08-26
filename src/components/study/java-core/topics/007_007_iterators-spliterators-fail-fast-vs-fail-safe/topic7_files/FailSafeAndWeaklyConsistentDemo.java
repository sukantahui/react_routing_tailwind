/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 7: Fail-Safe & Weakly Consistent Iterators: CopyOnWriteArrayList & ConcurrentHashMap
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class FailSafeAndWeaklyConsistentDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: FAIL-SAFE & WEAKLY CONSISTENT ITERATORS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. SNAPSHOT ITERATOR (CopyOnWriteArrayList):
        List<String> cowList = new CopyOnWriteArrayList<>(List.of("Swadeep", "Tuhina"));
        Iterator<String> cowIt = cowList.iterator();

        cowList.add("Abhronila (Added AFTER iterator creation)"); // Mutates backing list

        System.out.println(">>> 1. CopyOnWriteArrayList (Immutable Snapshot Iterator):");
        while (cowIt.hasNext()) {
            System.out.println("  Snapshot Read: " + cowIt.next()); // Reads snapshot; does NOT see Abhronila, NEVER throws CME!
        }
        System.out.println("  Backing List : " + cowList);

        // 2. WEAKLY CONSISTENT ITERATOR (ConcurrentHashMap):
        Map<String, String> chMap = new ConcurrentHashMap<>();
        chMap.put("BRK", "Barrackpore");
        chMap.put("NAI", "Naihati");

        Iterator<String> chIt = chMap.keySet().iterator();
        chMap.put("SHY", "Shyamnagar"); // Mutates map during iteration

        System.out.println("\n>>> 2. ConcurrentHashMap (Weakly Consistent Iterator):");
        while (chIt.hasNext()) {
            System.out.println("  Traversed Key: " + chIt.next() + " (NEVER throws CME! May reflect recent updates)");
        }

        System.out.println("\n>>> FAIL-SAFE vs WEAKLY CONSISTENT SUMMARY:");
        System.out.println("  1. Snapshot (CopyOnWrite) : Iterates over exact immutable array clone created at iterator() time.");
        System.out.println("  2. Weakly Consistent (CHM): Iterates live nodes via volatile next pointers; never throws CME; reflects state changes when possible.");

        System.out.println("\n==========================================================================");
    }
}