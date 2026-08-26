/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 6: Java 8 Comparator Enhancements Overview: Static Factory Methods & Default Combinators
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class Java8ComparatorEnhancementsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: JAVA 8 Comparator ENHANCEMENTS OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE MODERN JAVA 8 COMPARATOR TOOLKIT (STATIC & DEFAULT METHODS):");
        System.out.println("  1. Factory Builders   : 'Comparator.comparing(keyExtractor)', 'comparingInt()', 'comparingDouble()'.");
        System.out.println("  2. Chained Multi-Sort : 'thenComparing(secondaryExtractor)', 'thenComparingInt()'.");
        System.out.println("  3. Direction Inversion: 'reversed()' (Flips any existing comparator instantly).");
        System.out.println("  4. Null-Safe Sorters  : 'Comparator.nullsFirst(c)', 'Comparator.nullsLast(c)'.");
        System.out.println("  5. Natural Order Keys : 'Comparator.naturalOrder()', 'Comparator.reverseOrder()'.");

        System.out.println("\n>>> WHY JAVA 8 COMPARATOR FACTORIES ARE REVOLUTIONARY:");
        System.out.println("  - Replaces 20-line boilerplate anonymous inner classes with a single declarative line.");
        System.out.println("  - Type-safe, readable, and perfectly suited for method references (e.g. Employee::getSalary).");

        System.out.println("\n==========================================================================");
    }
}