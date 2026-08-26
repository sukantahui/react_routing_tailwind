/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 12: NavigableSet Complete Query Method Suite: Proximity, Sub-Ranges & Polls
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.NavigableSet;
import java.util.TreeSet;

public class NavigableSetQueryMethodsSuiteDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: NavigableSet COMPLETE QUERY METHODS SUITE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        NavigableSet<Integer> taxThresholds = new TreeSet<>();
        taxThresholds.addAll(Set.of(10000, 25000, 50000, 75000, 100000, 150000));

        System.out.println(">>> Base Sorted Thresholds: " + taxThresholds);

        // 1. Proximity Lookups:
        System.out.println("\n>>> 1. Proximity Navigation around 50,000:");
        System.out.println("  lower(50000)   (< 50000)  : ₹" + taxThresholds.lower(50000));
        System.out.println("  floor(50000)   (<= 50000) : ₹" + taxThresholds.floor(50000));
        System.out.println("  ceiling(50000) (>= 50000) : ₹" + taxThresholds.ceiling(50000));
        System.out.println("  higher(50000)  (> 50000)  : ₹" + taxThresholds.higher(50000));

        // 2. Sub-Range Views with Inclusive/Exclusive Flags:
        System.out.println("\n>>> 2. Sub-Range Views (subSet, headSet, tailSet):");
        System.out.println("  subSet(25000, true, 75000, true) : " + taxThresholds.subSet(25000, true, 75000, true));
        System.out.println("  headSet(50000, false) (strictly < 50k) : " + taxThresholds.headSet(50000, false));
        System.out.println("  tailSet(75000, true)  (>= 75k)         : " + taxThresholds.tailSet(75000, true));

        // 3. Extreme Extraction via pollFirst() and pollLast():
        System.out.println("\n>>> 3. Extreme Extraction (pollFirst & pollLast):");
        System.out.println("  Lowest Polled & Removed  : ₹" + taxThresholds.pollFirst());
        System.out.println("  Highest Polled & Removed : ₹" + taxThresholds.pollLast());
        System.out.println("  Remaining Set Elements   : " + taxThresholds);

        System.out.println("\n==========================================================================");
    }
}