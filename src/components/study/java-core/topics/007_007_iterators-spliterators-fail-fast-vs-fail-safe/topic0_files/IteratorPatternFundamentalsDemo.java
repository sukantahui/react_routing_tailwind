/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 0: The Iterator Pattern in Java: Decoupling Traversal from Internal Structure
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class IteratorPatternFundamentalsDemo {

    // Universal Traversal Method (Decoupled from Collection Data Structure!):
    public static <T> void printAnyCollection(Iterable<T> collection, String label) {
        System.out.println(">>> Traversing " + label + " via Iterator Interface:");
        Iterator<T> iterator = collection.iterator();
        while (iterator.hasNext()) {
            System.out.println("  Item: " + iterator.next());
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE ITERATOR PATTERN IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> branchList = new ArrayList<>(List.of("Barrackpore (Array)", "Naihati (Array)", "Shyamnagar (Array)"));
        Set<String> branchSet = new HashSet<>(Set.of("Barrackpore (Hash)", "Naihati (Hash)", "Shyamnagar (Hash)"));

        // 1. Traversing ArrayList (Contiguous Array) via Iterator:
        printAnyCollection(branchList, "ArrayList");

        // 2. Traversing HashSet (Hash Buckets) via Iterator:
        System.out.println();
        printAnyCollection(branchSet, "HashSet");

        System.out.println("\n>>> CORE BENEFITS OF THE ITERATOR PATTERN (GoF Pattern):");
        System.out.println("  1. Encapsulation : Client code traverses elements without knowing if the underlying structure is an array, linked list, hash table, or binary tree.");
        System.out.println("  2. Uniform API   : 'hasNext()' and 'next()' provide a single standardized traversal contract across all Collections.");
        System.out.println("  3. Iterable Base : Any class implementing 'java.lang.Iterable' automatically supports the enhanced for-each loop!");

        System.out.println("\n==========================================================================");
    }
}