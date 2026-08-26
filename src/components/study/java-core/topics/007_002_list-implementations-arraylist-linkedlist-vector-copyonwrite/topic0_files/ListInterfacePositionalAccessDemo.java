/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 0: The java.util.List Interface: Positional Access & Bidirectional ListIterator
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class ListInterfacePositionalAccessDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.util.List & ListIterator - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentRankings = new ArrayList<>();
        studentRankings.add("Swadeep Paul");
        studentRankings.add("Tuhina Das");
        studentRankings.add("Abhronila Das");
        studentRankings.add("Debangshu Mukherjee");

        // 1. Positional Index Modification:
        studentRankings.set(1, "Tuhina Das (Gold Medalist)");
        System.out.println(">>> 1. Positional Update at Index 1:");
        System.out.println("  " + studentRankings);

        // 2. Bidirectional Traversal with ListIterator:
        System.out.println("\n>>> 2. Reverse Traversal with ListIterator (hasPrevious / previous):");
        ListIterator<String> listIter = studentRankings.listIterator(studentRankings.size()); // Start at end
        while (listIter.hasPrevious()) {
            int prevIndex = listIter.previousIndex();
            String student = listIter.previous();
            System.out.printf("  Index [%d] : %s%n", prevIndex, student);
        }

        // 3. SubList Range View:
        List<String> topTwo = studentRankings.subList(0, 2);
        System.out.println("\n>>> 3. SubList View (fromIndex 0 to 2): " + topTwo);

        System.out.println("\n>>> ADVANCED ListIterator CAPABILITIES:");
        System.out.println("  1. Bidirectional Movement: 'next()', 'previous()', 'hasNext()', 'hasPrevious()'.");
        System.out.println("  2. Index Awareness       : 'nextIndex()' and 'previousIndex()'.");
        System.out.println("  3. In-Flight Mutation     : 'set(E)' (replace current) and 'add(E)' (insert at cursor).");

        System.out.println("\n==========================================================================");
    }
}