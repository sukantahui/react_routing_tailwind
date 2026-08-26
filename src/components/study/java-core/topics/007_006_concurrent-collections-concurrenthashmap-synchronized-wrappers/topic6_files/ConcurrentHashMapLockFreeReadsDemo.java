/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 6: Lock-Free Reads in ConcurrentHashMap: Volatile Node Pointers & Memory Visibility
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapLockFreeReadsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: LOCK-FREE READS IN ConcurrentHashMap - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentHashMap<String, String> studentRecords = new ConcurrentHashMap<>();
        studentRecords.put("STU-101", "Swadeep Paul");

        // Calling get() is 100% LOCK-FREE:
        String name = studentRecords.get("STU-101");
        System.out.println(">>> 1. Lock-Free Read Result: " + name);

        System.out.println("\n>>> HOW ConcurrentHashMap ACHIEVES LOCK-FREE READS:");
        System.out.println("  1. In JDK Source Code for Node<K,V>:");
        System.out.println("     - 'volatile V val;'         -> The value field is declared volatile!");
        System.out.println("     - 'volatile Node<K,V> next;' -> The next node pointer is declared volatile!");
        System.out.println("  2. Happens-Before Memory Guarantee:");
        System.out.println("     - Any write to 'val' or 'next' by a mutating thread is IMMEDIATELY visible to reading threads without locks.");
        System.out.println("  3. Non-Blocking Traversal:");
        System.out.println("     - 'get(key)' never acquires a synchronized lock or CAS loop; it traverses nodes at raw hardware memory speed.");

        System.out.println("\n==========================================================================");
    }
}