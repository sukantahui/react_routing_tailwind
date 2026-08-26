/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 0: The java.util.Set Interface: Mathematical Set Concept & Duplicate Rejection
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashSet;
import java.util.Set;

public class SetInterfaceFundamentalsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.util.Set MATHEMATICAL CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Set<String> branchSet = new HashSet<>();

        // 1. Adding Elements and Receiving Boolean Status:
        boolean added1 = branchSet.add("Barrackpore Central");
        boolean added2 = branchSet.add("Naihati Center");
        boolean added3 = branchSet.add("Shyamnagar Hub");
        boolean addedDuplicate = branchSet.add("Barrackpore Central"); // Duplicate!

        System.out.println(">>> 1. Set Ingestion Results:");
        System.out.println("  Added 'Barrackpore Central' 1st time : " + added1);
        System.out.println("  Added 'Naihati Center'               : " + added2);
        System.out.println("  Added 'Shyamnagar Hub'              : " + added3);
        System.out.println("  Added 'Barrackpore Central' duplicate: " + addedDuplicate + " (Rejected!)");
        System.out.println("  Current Set Size : " + branchSet.size());

        // 2. Single Null Element Permissibility:
        boolean addedNull1 = branchSet.add(null);
        boolean addedNull2 = branchSet.add(null); // Duplicate null rejected!

        System.out.println("\n>>> 2. Null Permissibility (At most 1 null allowed):");
        System.out.println("  First null added?     : " + addedNull1);
        System.out.println("  Duplicate null added? : " + addedNull2);
        System.out.println("  Set Elements          : " + branchSet);

        System.out.println("\n>>> MATHEMATICAL CONTRACT OF java.util.Set<E>:");
        System.out.println("  1. No Duplicates : Set enforces (e1.equals(e2) == false) for all element pairs.");
        System.out.println("  2. At Most 1 Null: Allows at most one null reference (HashSet/LinkedHashSet).");
        System.out.println("  3. Non-Positional: No index-based access (no 'get(int index)').");

        System.out.println("\n==========================================================================");
    }
}