/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 9: Null-Safe Sorting: Comparator.nullsFirst() & Comparator.nullsLast()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class NullSafeComparatorWrappersDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: NULL-SAFE COMPARATORS (nullsFirst & nullsLast) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> branchCodes = new ArrayList<>(Arrays.asList(
                "BRK-101", null, "NAI-102", null, "SHY-103", "ICH-104"
        ));

        System.out.println(">>> 1. Original List with Nulls: " + branchCodes);

        // 1. Sorting with nullsFirst():
        branchCodes.sort(Comparator.nullsFirst(Comparator.naturalOrder()));
        System.out.println("\n>>> 2. Sorted with Comparator.nullsFirst():");
        System.out.println("  " + branchCodes + " (All nulls placed safely at FRONT!)");

        // 2. Sorting with nullsLast():
        branchCodes.sort(Comparator.nullsLast(Comparator.naturalOrder()));
        System.out.println("\n>>> 3. Sorted with Comparator.nullsLast():");
        System.out.println("  " + branchCodes + " (All nulls placed safely at END!)");

        System.out.println("\n>>> WHY NULL-SAFE WRAPPERS PREVENT PRODUCTION OUTAGES:");
        System.out.println("  - Without nullsFirst/Last: A single null in a 1,000,000-row list will crash the sorting thread with NullPointerException!");
        System.out.println("  - With nullsFirst/Last: Java intercepts null references before calling compareTo(), positioning nulls safely without exceptions.");

        System.out.println("\n==========================================================================");
    }
}