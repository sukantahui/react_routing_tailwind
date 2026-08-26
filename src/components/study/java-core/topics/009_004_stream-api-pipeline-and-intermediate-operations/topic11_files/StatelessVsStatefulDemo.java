/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 11: Stateless vs Stateful Intermediate Operations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;

public class StatelessVsStatefulDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: STATELESS VS STATEFUL OPERATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> numbers = List.of(5, 2, 8, 2, 9, 1, 5, 4);

        System.out.println(">>> 1. STATELESS PIPELINE (filter, map, peek):");
        System.out.println("    - Each element is processed independently in O(1) memory.");
        numbers.stream()
            .filter(n -> n > 3)                   // Stateless
            .map(n -> n * 10)                     // Stateless
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        System.out.println("\n>>> 2. STATEFUL PIPELINE (distinct, sorted):");
        System.out.println("    - 'distinct()' maintains a Set of seen elements.");
        System.out.println("    - 'sorted()' must BUFFER ALL elements before emitting the first element!");
        numbers.stream()
            .distinct()                           // Stateful (remembers seen elements)
            .sorted()                             // Stateful (full buffer required)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        System.out.println("\n>>> ARCHITECTURAL COMPARISON:");
        System.out.println("  - Stateless operations can stream infinite data easily.");
        System.out.println("  - Calling sorted() on an infinite stream causes an OutOfMemoryError!");
        System.out.println("==========================================================================");
    }
}
