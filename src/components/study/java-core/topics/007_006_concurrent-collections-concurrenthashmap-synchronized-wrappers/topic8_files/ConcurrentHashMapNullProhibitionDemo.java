/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 8: Why ConcurrentHashMap Prohibits Null Keys & Null Values (The Ambiguity Hazard)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapNullProhibitionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: WHY ConcurrentHashMap FORBIDS NULL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();

        // 1. Attempting to insert null key:
        System.out.println(">>> 1. Testing Null Key Insertion:");
        try {
            map.put(null, "Barrackpore Value");
        } catch (NullPointerException e) {
            System.out.println("  [CAUGHT EXPECTED NPE] map.put(null, val) threw NullPointerException!");
        }

        // 2. Attempting to insert null value:
        System.out.println("\n>>> 2. Testing Null Value Insertion:");
        try {
            map.put("BRK-101", null);
        } catch (NullPointerException e) {
            System.out.println("  [CAUGHT EXPECTED NPE] map.put(key, null) threw NullPointerException!");
        }

        System.out.println("\n>>> DOUG LEA'S REASONING: THE CONCURRENT NULL AMBIGUITY HAZARD:");
        System.out.println("  - In single-threaded HashMap: If 'map.get(key) == null', you can call 'map.containsKey(key)' to check if the key is absent or mapped to null.");
        System.out.println("  - In Concurrent Multithreaded Map:");
        System.out.println("    1. Thread A calls 'map.get(key)' -> returns null.");
        System.out.println("    2. Before Thread A can call 'map.containsKey(key)', Thread B inserts or removes the key!");
        System.out.println("    3. The map state changed between the two calls! 'containsKey()' cannot confirm past state!");
        System.out.println("    4. In concurrent environments, null produces dangerous race-condition ambiguities.");
        System.out.println("    5. Rule: Concurrent collections (ConcurrentHashMap, ConcurrentLinkedQueue) strictly ban nulls!");

        System.out.println("\n==========================================================================");
    }
}