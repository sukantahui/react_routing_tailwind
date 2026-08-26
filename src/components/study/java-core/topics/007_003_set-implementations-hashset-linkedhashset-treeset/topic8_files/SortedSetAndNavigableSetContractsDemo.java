/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 8: The java.util.SortedSet & java.util.NavigableSet Interface Contracts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.NavigableSet;
import java.util.SortedSet;
import java.util.TreeSet;

public class SortedSetAndNavigableSetContractsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: SortedSet & NavigableSet INTERFACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        NavigableSet<Integer> studentScores = new TreeSet<>();
        studentScores.addAll(Set.of(45, 62, 78, 85, 92, 98));

        // 1. SortedSet Methods (first, last, subSet, headSet, tailSet):
        SortedSet<Integer> sortedView = studentScores;
        System.out.println(">>> 1. SortedSet Core Queries:");
        System.out.println("  Lowest Score (first())  : " + sortedView.first());
        System.out.println("  Highest Score (last())  : " + sortedView.last());
        System.out.println("  SubSet [62 to 92)       : " + sortedView.subSet(62, 92)); // 62 inclusive, 92 exclusive

        // 2. NavigableSet Navigation Methods (closest match queries):
        System.out.println("\n>>> 2. NavigableSet Proximity Lookups:");
        System.out.println("  Scores: " + studentScores);
        System.out.println("  lower(85)   (strictly < 85) : " + studentScores.lower(85));
        System.out.println("  floor(85)   (<= 85)         : " + studentScores.floor(85));
        System.out.println("  ceiling(80) (>= 80)         : " + studentScores.ceiling(80));
        System.out.println("  higher(85)  (strictly > 85) : " + studentScores.higher(85));

        // 3. Descending Reversal:
        System.out.println("\n>>> 3. Reverse View (descendingSet()):");
        System.out.println("  Descending Scores : " + studentScores.descendingSet());

        System.out.println("\n>>> INTERFACE INHERITANCE HIERARCHY:");
        System.out.println("  java.util.Collection<E>");
        System.out.println("    └── java.util.Set<E>");
        System.out.println("          └── java.util.SortedSet<E>     (first, last, headSet, tailSet)");
        System.out.println("                └── java.util.NavigableSet<E> (lower, floor, ceiling, higher, pollFirst, descendingSet)");
        System.out.println("                      └── java.util.TreeSet<E>");

        System.out.println("\n==========================================================================");
    }
}