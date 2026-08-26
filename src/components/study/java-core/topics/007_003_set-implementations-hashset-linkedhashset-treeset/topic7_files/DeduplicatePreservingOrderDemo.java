/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 7: When to Use LinkedHashSet: Deduplicating Lists While Preserving Original Sequence
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

public class DeduplicatePreservingOrderDemo {

    // High-performance one-liner to deduplicate a List while keeping original order:
    public static <T> List<T> removeDuplicatesPreservingOrder(List<T> originalList) {
        // LinkedHashSet strips duplicates in O(n) while preserving exact first-seen order:
        return new ArrayList<>(new LinkedHashSet<>(originalList));
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: DEDUPLICATING WITH LinkedHashSet - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> rawSubmissions = List.of(
                "Swadeep Paul (Barrackpore)",
                "Tuhina Das (Naihati)",
                "Swadeep Paul (Barrackpore)", // Duplicate
                "Abhronila Das (Shyamnagar)",
                "Tuhina Das (Naihati)",       // Duplicate
                "Debangshu Mukherjee (Ichapur)"
        );

        System.out.println(">>> 1. Raw Input List with Duplicates:");
        for (int i = 0; i < rawSubmissions.size(); i++) {
            System.out.printf("  Pos %d: %s%n", i, rawSubmissions.get(i));
        }

        List<String> cleanedList = removeDuplicatesPreservingOrder(rawSubmissions);

        System.out.println("\n>>> 2. Cleaned List (Deduplicated & Original Sequence Preserved):");
        for (int i = 0; i < cleanedList.size(); i++) {
            System.out.printf("  Pos %d: %s%n", i, cleanedList.get(i));
        }

        System.out.println("\n>>> 3 IDEAL USE CASES FOR LinkedHashSet:");
        System.out.println("  1. Deduplicating Input Streams: Removing duplicates while keeping user's chronological submission order.");
        System.out.println("  2. LRU Caches                 : LinkedHashSet/LinkedHashMap access-order mode for cache eviction.");
        System.out.println("  3. Deterministic Testing       : Test assertions that require predictable iteration output.");

        System.out.println("\n==========================================================================");
    }
}