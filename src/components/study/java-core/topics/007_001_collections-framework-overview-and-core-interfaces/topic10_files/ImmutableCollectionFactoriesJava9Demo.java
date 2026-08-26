/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 10: Unmodifiable / Immutable Collection Factories: List.of(), Set.of() & Map.of()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class ImmutableCollectionFactoriesJava9Demo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: JAVA 9+ IMMUTABLE COLLECTION FACTORIES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Immutable List via List.of():
        List<String> branches = List.of("Barrackpore", "Naihati", "Shyamnagar");
        System.out.println(">>> 1. Immutable List (List.of()): " + branches);

        // 2. Immutable Set via Set.of():
        Set<Integer> pinCodes = Set.of(700120, 743165, 743127);
        System.out.println(">>> 2. Immutable Set (Set.of())  : " + pinCodes);

        // 3. Immutable Map via Map.of() and Map.ofEntries():
        Map<String, String> branchTeachers = Map.of(
                "Barrackpore", "Sukanta Hui",
                "Naihati", "Swadeep Paul",
                "Shyamnagar", "Tuhina Das"
        );
        System.out.println(">>> 3. Immutable Map (Map.of())  : " + branchTeachers);

        // 4. Mutation Attempts Trigger UnsupportedOperationException:
        System.out.println("\n>>> 4. Mutation Protection In Action:");
        try {
            branches.add("Ichapur");
        } catch (UnsupportedOperationException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] branches.add() threw UnsupportedOperationException!");
        }

        // 5. Null Prohibition in Java 9 factories:
        System.out.println("\n>>> 5. Null Safety Guard:");
        try {
            List.of("Barrackpore", null); // Fails immediately with NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] List.of() forbids null elements (throws NPE)!");
        }

        System.out.println("\n==========================================================================");
    }
}