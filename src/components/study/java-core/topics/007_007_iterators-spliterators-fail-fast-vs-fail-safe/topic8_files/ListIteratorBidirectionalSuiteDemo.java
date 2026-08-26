/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 8: java.util.ListIterator: Bidirectional Traversal, Index Queries & Inline Mutations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class ListIteratorBidirectionalSuiteDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: java.util.ListIterator BIDIRECTIONAL SUITE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> branchRoute = new ArrayList<>(List.of("Barrackpore", "Naihati", "Shyamnagar"));

        ListIterator<String> listIt = branchRoute.listIterator();

        // 1. Forward Traversal:
        System.out.println(">>> 1. Forward Traversal (hasNext & nextIndex):");
        while (listIt.hasNext()) {
            int nextIdx = listIt.nextIndex();
            String station = listIt.next();
            System.out.printf("  Index %d: %s%n", nextIdx, station);

            // Inline replacement via listIterator.set():
            if (station.equals("Naihati")) {
                listIt.set("Naihati Junction"); // Safely mutates current item!
            }
        }

        // 2. Backward Traversal:
        System.out.println("\n>>> 2. Backward Traversal (hasPrevious & previous):");
        while (listIt.hasPrevious()) {
            int prevIdx = listIt.previousIndex();
            String station = listIt.previous();
            System.out.printf("  Index %d: %s%n", prevIdx, station);
        }

        // 3. Inline insertion via listIterator.add():
        listIt.add("Sealdah Central (Inserted at Head)");

        System.out.println("\n>>> 3. Final Route after set() and add():");
        System.out.println("  " + branchRoute);

        System.out.println("\n>>> EXCLUSIVE POWERS OF ListIterator<E> (LIST ONLY):");
        System.out.println("  1. Bidirectional : 'hasPrevious()' and 'previous()' for reverse navigation.");
        System.out.println("  2. Index Tracking: 'nextIndex()' and 'previousIndex()' return integer positions.");
        System.out.println("  3. Inline Replace: 'set(e)' replaces the last returned element.");
        System.out.println("  4. Inline Insert : 'add(e)' inserts an element before the cursor position.");

        System.out.println("\n==========================================================================");
    }
}