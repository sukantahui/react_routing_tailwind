/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 6: Recursive Type Bounds: <T extends Comparable<T>> for Self-Comparison
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.List;

public class RecursiveTypeBoundsSelfComparisonDemo {

    // RECURSIVE TYPE BOUND:
    // '<T extends Comparable<T>>' guarantees that 'T' can be compared against other instances of ITS OWN TYPE 'T'!
    public static <T extends Comparable<T>> T findMaximum(List<T> items) {
        if (items == null || items.isEmpty()) return null;
        T max = items.get(0);
        for (int i = 1; i < items.size(); i++) {
            if (items.get(i).compareTo(max) > 0) {
                max = items.get(i);
            }
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: RECURSIVE TYPE BOUNDS (<T extends Comparable<T>>) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> students = List.of("Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee");
        List<Integer> fees = List.of(8500, 9200, 9800, 8500);
        List<Double> gpaList = List.of(9.85, 9.90, 9.95, 9.75);

        String topAlphabetical = findMaximum(students);
        Integer highestFee = findMaximum(fees);
        Double highestGpa = findMaximum(gpaList);

        System.out.println(">>> 1. Recursive Bound Maximum Evaluations:");
        System.out.println("  Top Alphabetical Student : " + topAlphabetical);
        System.out.println("  Highest Fee Collected    : ₹" + highestFee);
        System.out.println("  Highest GPA Scored       : " + highestGpa);

        System.out.println("\n>>> WHY RECURSIVE TYPE BOUNDS ARE CALLED 'RECURSIVE':");
        System.out.println("  1. Self-Referential: The type variable 'T' appears inside its own bounding constraint ('extends Comparable<T>').");
        System.out.println("  2. Mutual Comparability: Ensures elements in the collection can be compared with one another, preventing type collisions.");
        System.out.println("  3. Ubiquitous in Collections: Used in 'Collections.max()', 'Collections.sort()', and 'TreeSet'.");

        System.out.println("\n==========================================================================");
    }
}