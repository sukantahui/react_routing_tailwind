/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 16: sorted() - Natural Ordering & Custom Comparator Chains
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.Comparator;
import java.util.List;

public class SortedComparatorsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: SORTED() & COMPARATORS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentResult> results = List.of(
            new StudentResult("Swadeep Paul", "Barrackpore", 88.5),
            new StudentResult("Tuhina Das", "Naihati", 95.0),
            new StudentResult("Abhronila Das", "Shyamnagar", 88.5),
            new StudentResult("Debangshu Mukherjee", "Ichapur", 92.0),
            new StudentResult("Priya Sharma", "Barrackpore", 76.0)
        );

        // 1. Natural Sort on Strings (Alphabetical)
        List<String> names = List.of("Swadeep", "Tuhina", "Abhronila", "Debangshu");
        System.out.println("1. Natural Alphabetical Sort: " + names.stream().sorted().toList());

        // 2. Custom Comparator: Sorted by Score Descending (Highest First)
        System.out.println("\n2. Sorted by Score (Descending):");
        results.stream()
            .sorted(Comparator.comparingDouble(StudentResult::score).reversed())
            .forEach(r -> System.out.println("   - " + r.name() + ": " + r.score() + "%"));

        // 3. Multi-level Comparator Chain: Score Descending, then Name Ascending for ties
        System.out.println("\n3. Chained Sort (Score Descending -> Name Alphabetical for ties):");
        results.stream()
            .sorted(
                Comparator.comparingDouble(StudentResult::score).reversed()
                    .thenComparing(StudentResult::name)
            )
            .forEach(r -> System.out.println("   - " + r.name() + " (" + r.center() + "): " + r.score() + "%"));

        System.out.println("\n==========================================================================");
    }

    record StudentResult(String name, String center, double score) {}
}
