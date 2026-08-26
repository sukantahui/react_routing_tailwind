/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 6: java.util.LinkedHashSet: Maintaining Insertion Order via Doubly Linked Bucket Pointers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetDoublyLinkedBucketDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: LinkedHashSet DOUBLY LINKED POINTERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. STANDARD HashSet (Unordered Hash Distribution):
        Set<String> unorderedHashSet = new HashSet<>();
        unorderedHashSet.add("Barrackpore (Admission 1)");
        unorderedHashSet.add("Naihati (Admission 2)");
        unorderedHashSet.add("Shyamnagar (Admission 3)");
        unorderedHashSet.add("Ichapur (Admission 4)");

        System.out.println(">>> 1. Standard HashSet (Random Hash Table Bucket Order):");
        System.out.println("  " + unorderedHashSet);

        // 2. LinkedHashSet (Maintains Strict Insertion Order):
        Set<String> orderedLinkedHashSet = new LinkedHashSet<>();
        orderedLinkedHashSet.add("Barrackpore (Admission 1)");
        orderedLinkedHashSet.add("Naihati (Admission 2)");
        orderedLinkedHashSet.add("Shyamnagar (Admission 3)");
        orderedLinkedHashSet.add("Ichapur (Admission 4)");

        System.out.println("\n>>> 2. LinkedHashSet (Insertion Order 100% Guaranteed):");
        System.out.println("  " + orderedLinkedHashSet);

        System.out.println("\n>>> HOW LinkedHashSet MAINTAINS INSERTION ORDER:");
        System.out.println("  1. Backed by 'LinkedHashMap' (which extends HashMap).");
        System.out.println("  2. Every entry is an 'Entry<K,V>' that contains two extra pointers: 'Entry before, after'.");
        System.out.println("  3. A global doubly-linked list threads through all entries across buckets, making iteration order strictly chronological!");

        System.out.println("\n==========================================================================");
    }
}