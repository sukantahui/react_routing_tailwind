/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 6: 1. java.util.List: Ordered Zero-Indexed Sequence & Duplicate Permissibility
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.List;

public class ListInterfaceContractBehaviorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: java.util.List<E> CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentRankings = new ArrayList<>();

        // 1. Positional Insertion:
        studentRankings.add("Swadeep Paul (Rank 1)");
        studentRankings.add("Tuhina Das (Rank 2)");
        studentRankings.add("Abhronila Das (Rank 3)");

        // 2. Duplicate Permissibility:
        studentRankings.add("Swadeep Paul (Rank 1)"); // Legal duplicate!

        // 3. Index-Based Insertion & Retrieval:
        studentRankings.add(1, "Debangshu Mukherjee (New Rank 2)"); // Shifts existing elements right!
        String rankZero = studentRankings.get(0);
        String lastElement = studentRankings.get(studentRankings.size() - 1);

        System.out.println(">>> 1. List Inspection (Indexed Order Preserved):");
        for (int i = 0; i < studentRankings.size(); i++) {
            System.out.printf("  Index [%d] : %s%n", i, studentRankings.get(i));
        }

        // 4. Index-Based Search (indexOf / lastIndexOf):
        System.out.println("\n>>> 2. Positional Search:");
        System.out.println("  First Index of 'Swadeep Paul (Rank 1)' : " + studentRankings.indexOf("Swadeep Paul (Rank 1)"));
        System.out.println("  Last Index of 'Swadeep Paul (Rank 1)'  : " + studentRankings.lastIndexOf("Swadeep Paul (Rank 1)"));

        System.out.println("\n>>> CORE PROPERTIES OF java.util.List<E>:");
        System.out.println("  1. Strict Ordering : Insertion order is permanently preserved.");
        System.out.println("  2. Zero-Indexed    : Elements accessed by integer index 'get(int)' and 'set(int, E)'.");
        System.out.println("  3. Duplicate Safe  : Any number of duplicate and null elements are allowed.");

        System.out.println("\n==========================================================================");
    }
}