/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 14: Unmodifiable Wrappers: Collections.unmodifiableList() & The Backing View Trap
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnmodifiableWrappersDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: Collections UNMODIFIABLE WRAPPERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> mutableCourses = new ArrayList<>();
        mutableCourses.add("Java Core");
        mutableCourses.add("Spring Boot");

        // 1. Creating an unmodifiable read-only wrapper view:
        List<String> readOnlyCourses = Collections.unmodifiableList(mutableCourses);

        System.out.println(">>> 1. Read-Only Wrapper View: " + readOnlyCourses);

        // 2. Direct mutation attempt throws UnsupportedOperationException:
        try {
            readOnlyCourses.add("Microservices"); // Mutating read-only view directly!
        } catch (UnsupportedOperationException e) {
            System.out.println("\n>>> 2. [BLOCKED] readOnlyCourses.add() threw UnsupportedOperationException!");
        }

        // 3. THE BACKING VIEW TRAP (Unmodifiable is NOT Truly Immutable!):
        System.out.println("\n>>> 3. The Backing View Trap:");
        mutableCourses.add("Cloud AWS & Docker"); // Mutates original backing list!
        System.out.println("  Modified Original List : " + mutableCourses);
        System.out.println("  Read-Only View Updated : " + readOnlyCourses + " (CHANGED! Because it is only a VIEW!)");

        System.out.println("\n>>> UNMODIFIABLE VIEW vs IMMUTABLE COLLECTION (Java 9 List.of):");
        System.out.println("  - 'Collections.unmodifiableList(orig)' : A read-only VIEW of original list. If orig changes, view changes too.");
        System.out.println("  - 'List.of(...)' / 'List.copyOf(orig)' : 100% Truly Immutable snapshot with zero backing connection.");

        System.out.println("\n==========================================================================");
    }
}