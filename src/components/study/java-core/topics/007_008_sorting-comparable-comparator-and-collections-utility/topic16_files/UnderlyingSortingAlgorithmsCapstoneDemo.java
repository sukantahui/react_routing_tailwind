/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 16: Java Internal Sorting Algorithms: Dual-Pivot Quicksort & TimSort (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class UnderlyingSortingAlgorithmsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: JAVA SORTING INTERNALS: DUAL-PIVOT QUICKSORT & TIMSORT (CAPSTONE)");
        System.out.println("==========================================================================\n");

        // 1. Primitive Array Sorting (Uses Dual-Pivot Quicksort by Vladimir Yaroslavskiy):
        int[] primitiveScores = {85, 42, 99, 12, 73, 64, 91};
        Arrays.sort(primitiveScores); // Dual-Pivot Quicksort
        System.out.println(">>> 1. Primitive Array Sorted via Dual-Pivot Quicksort:");
        System.out.println("  " + Arrays.toString(primitiveScores));

        // 2. Object List Sorting (Uses TimSort by Tim Peters):
        List<String> studentNames = new ArrayList<>(List.of("Swadeep", "Tuhina", "Abhronila", "Debangshu"));
        Collections.sort(studentNames); // TimSort
        System.out.println("\n>>> 2. Object Collection Sorted via TimSort:");
        System.out.println("  " + studentNames);

        System.out.println("\n>>> DEEP ARCHITECTURAL COMPARISON OF JAVA SORTING ENGINES:");
        System.out.println("+----------------------+---------------------------+---------------------------+");
        System.out.println("| Feature              | Dual-Pivot Quicksort      | TimSort                   |");
        System.out.println("+----------------------+---------------------------+---------------------------+");
        System.out.println("| Applied To           | Primitive Arrays (int[])  | Object Arrays & Lists     |");
        System.out.println("| Algorithm Family     | Hybrid Quicksort (2 pivots| Hybrid Merge + Insertion  |");
        System.out.println("| Best-Case Time       | O(n log n)                | O(n) (Already sorted!)    |");
        System.out.println("| Average-Case Time    | O(n log n)                | O(n log n)                |");
        System.out.println("| Worst-Case Time      | O(n^2)                    | O(n log n) Guaranteed     |");
        System.out.println("| Stability            | UNSTABLE (Order may flip) | STABLE (Preserves order)  |");
        System.out.println("| Extra Space          | O(log n) stack space      | O(n) temp array buffer    |");
        System.out.println("+----------------------+---------------------------+---------------------------+");

        System.out.println("\n>>> WHY TIMSORT WAS CHOSEN FOR OBJECTS:");
        System.out.println("  - STABILITY IS CRITICAL FOR OBJECTS: If you sort employees by Name, and then sort by Department, TimSort GUARANTEES names remain alphabetical within each department!");
        System.out.println("  - EXPLOITS NATURAL RUNS: Real-world data is often partially sorted; TimSort detects existing sorted chunks ('runs') and merges them in O(n) time!");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 007_008 SORTING, COMPARABLE & COLLECTIONS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}