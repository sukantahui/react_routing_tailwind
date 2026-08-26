/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 9: Atomic Operations on ConcurrentHashMap: putIfAbsent(), computeIfAbsent() & replace()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class ConcurrentHashMapAtomicOperationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ATOMIC OPERATIONS ON ConcurrentHashMap - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentMap<String, String> tokenRegistry = new ConcurrentHashMap<>();

        // 1. putIfAbsent(): Atomic insertion if key does not exist:
        String prev1 = tokenRegistry.putIfAbsent("BRK-101", "Swadeep Paul");
        String prev2 = tokenRegistry.putIfAbsent("BRK-101", "Duplicate Swadeep"); // Fails atomically!

        System.out.println(">>> 1. putIfAbsent() Results:");
        System.out.println("  1st Insertion previous value: " + prev1 + " (Inserted!)");
        System.out.println("  2nd Insertion previous value: " + prev2 + " (Rejected atomically!)");

        // 2. replace(key, oldValue, newValue): Atomic Compare-And-Swap (CAS):
        boolean replacedWrong = tokenRegistry.replace("BRK-101", "Wrong Old Value", "New Value");
        boolean replacedCorrect = tokenRegistry.replace("BRK-101", "Swadeep Paul", "Swadeep Paul (Senior Lead)");

        System.out.println("\n>>> 2. Atomic replace(key, oldValue, newValue):");
        System.out.println("  Replace with wrong expected value  : " + replacedWrong + " (Failed CAS)");
        System.out.println("  Replace with correct expected value: " + replacedCorrect + " (Successful CAS!)");

        // 3. remove(key, value): Conditional atomic removal:
        boolean removedWrong = tokenRegistry.remove("BRK-101", "Outdated Value");
        boolean removedCorrect = tokenRegistry.remove("BRK-101", "Swadeep Paul (Senior Lead)");

        System.out.println("\n>>> 3. Conditional remove(key, value):");
        System.out.println("  Remove with wrong value  : " + removedWrong + " (Skipped)");
        System.out.println("  Remove with matched value: " + removedCorrect + " (Atomically unlinked!)");

        System.out.println("\n==========================================================================");
    }
}