/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 11: Core Algorithms: sort(), binarySearch(), reverse(), shuffle(), and swap()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsAlgorithmsSuiteDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: Collections ALGORITHMS SUITE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentRolls = new ArrayList<>(List.of(
                "Swadeep", "Tuhina", "Abhronila", "Debangshu", "Sourav"
        ));

        // 1. sort() & reverse():
        Collections.sort(studentRolls);
        System.out.println(">>> 1. Sorted Alphabetically: " + studentRolls);

        Collections.reverse(studentRolls);
        System.out.println(">>> 2. Reversed Sequence    : " + studentRolls);

        // 2. binarySearch() (Pre-condition: list MUST be sorted in ascending order!):
        Collections.sort(studentRolls); // Re-sorting ascending
        int foundIndex = Collections.binarySearch(studentRolls, "Swadeep");
        int missingIndex = Collections.binarySearch(studentRolls, "Priyanka");

        System.out.println("\n>>> 3. binarySearch() Execution:");
        System.out.println("  'Swadeep' found at index   : " + foundIndex);
        System.out.println("  'Priyanka' missing result  : " + missingIndex + " (Negative insertion point: -1)");

        // 3. swap() & shuffle():
        Collections.swap(studentRolls, 0, studentRolls.size() - 1);
        System.out.println("\n>>> 4. Swapped First & Last : " + studentRolls);

        Collections.shuffle(studentRolls); // Pseudo-random permutation
        System.out.println(">>> 5. Shuffled Randomly    : " + studentRolls);

        System.out.println("\n==========================================================================");
    }
}