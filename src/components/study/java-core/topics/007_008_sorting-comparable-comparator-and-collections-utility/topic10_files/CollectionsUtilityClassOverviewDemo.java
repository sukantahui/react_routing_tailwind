/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 10: The java.util.Collections Utility Class: Static Powerhouse Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class CollectionsUtilityClassOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: java.util.Collections UTILITY POWERHOUSE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 5 PILLARS OF java.util.Collections:");
        System.out.println("  1. Polymorphic Algorithms  : 'sort()', 'binarySearch()', 'reverse()', 'shuffle()', 'swap()'.");
        System.out.println("  2. Statistical Analysis    : 'min()', 'max()', 'frequency()', 'disjoint()'.");
        System.out.println("  3. Synchronized Wrappers   : 'synchronizedList()', 'synchronizedSet()', 'synchronizedMap()'.");
        System.out.println("  4. Immutability Wrappers   : 'unmodifiableList()', 'unmodifiableSet()', 'unmodifiableMap()'.");
        System.out.println("  5. Empty & Singleton Factory: 'emptyList()', 'singletonList()', 'emptyMap()'.");

        System.out.println("\n>>> ARCHITECTURAL DESIGN OF java.util.Collections:");
        System.out.println("  - It is a non-instantiable utility class (private constructor: 'private Collections() {}').");
        System.out.println("  - Consists exclusively of static polymorphic methods that operate on or return Collections.");
        System.out.println("  - DO NOT CONFUSE: 'Collection' (Interface) vs 'Collections' (Utility Class)!");

        System.out.println("\n==========================================================================");
    }
}