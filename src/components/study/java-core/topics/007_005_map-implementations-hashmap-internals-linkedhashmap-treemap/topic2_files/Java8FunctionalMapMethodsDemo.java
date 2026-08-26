/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 2: Java 8 Functional Map Additions: computeIfAbsent(), merge(), and compute()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Java8FunctionalMapMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: JAVA 8 FUNCTIONAL MAP METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. computeIfAbsent(): Building Multi-Maps (Grouping Students by Center):
        Map<String, List<String>> centerBatches = new HashMap<>();
        centerBatches.computeIfAbsent("Barrackpore", k -> new ArrayList<>()).add("Swadeep Paul");
        centerBatches.computeIfAbsent("Barrackpore", k -> new ArrayList<>()).add("Tuhina Das");
        centerBatches.computeIfAbsent("Naihati", k -> new ArrayList<>()).add("Abhronila Das");

        System.out.println(">>> 1. Grouping via computeIfAbsent():");
        centerBatches.forEach((center, students) ->
                System.out.println("  Center: " + center + " -> Students: " + students));

        // 2. merge(): Word / Frequency Counting in 1 Line:
        Map<String, Integer> feeCollectionTotals = new HashMap<>();
        String[] branchReceipts = {"Barrackpore", "Naihati", "Barrackpore", "Shyamnagar", "Barrackpore"};

        for (String branch : branchReceipts) {
            // If absent: sets to 5000; If present: adds 5000 to existing total!
            feeCollectionTotals.merge(branch, 5000, Integer::sum);
        }

        System.out.println("\n>>> 2. Frequency / Financial Aggregation via merge():");
        feeCollectionTotals.forEach((branch, total) ->
                System.out.printf("  Branch: %-12s -> Total Collected: ₹%d%n", branch, total));

        // 3. putIfAbsent():
        feeCollectionTotals.putIfAbsent("Ichapur", 3000);
        System.out.println("\n>>> 3. After putIfAbsent('Ichapur'): " + feeCollectionTotals);

        System.out.println("\n==========================================================================");
    }
}