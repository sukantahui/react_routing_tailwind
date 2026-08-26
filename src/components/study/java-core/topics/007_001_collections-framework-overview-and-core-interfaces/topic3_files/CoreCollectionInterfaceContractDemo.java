/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 3: The Core Collection Interface: java.util.Collection<E> Contract
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

public class CoreCollectionInterfaceContractDemo {

    // Polymorphic method operating on the universal 'Collection<E>' interface:
    public static <E> void displayCollectionStats(String label, Collection<E> collection) {
        System.out.println(">>> Collection: " + label);
        System.out.println("  Concrete Type : " + collection.getClass().getSimpleName());
        System.out.println("  Size (count)  : " + collection.size());
        System.out.println("  Is Empty?     : " + collection.isEmpty());
        System.out.println("  Elements      : " + collection);
        System.out.println("  ---------------------------------------------");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: java.util.Collection<E> CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Collection<String> listCollection = new ArrayList<>();
        listCollection.add("Swadeep Paul (Barrackpore)");
        listCollection.add("Tuhina Das (Naihati)");
        listCollection.add("Swadeep Paul (Barrackpore)"); // List permits duplicate!

        Collection<String> setCollection = new HashSet<>(listCollection); // Set deduplicates!

        displayCollectionStats("ArrayList as Collection", listCollection);
        displayCollectionStats("HashSet as Collection", setCollection);

        System.out.println("\n>>> WHY CODE TO THE 'Collection<E>' INTERFACE?");
        System.out.println("  1. High Reusability: Methods accepting 'Collection<E>' work on Lists, Sets, and Queues interchangeably.");
        System.out.println("  2. Loose Coupling: Callers can change concrete implementations (e.g. ArrayList -> TreeSet) without breaking downstream code.");

        System.out.println("\n==========================================================================");
    }
}