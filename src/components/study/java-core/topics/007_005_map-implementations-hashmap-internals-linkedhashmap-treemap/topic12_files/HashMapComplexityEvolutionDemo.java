/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 12: Search Complexity Evolution: From Java 7 O(n) to Java 8 O(log n) Treeification
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class HashMapComplexityEvolutionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: HashMap COMPLEXITY EVOLUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> COMPARATIVE COMPLEXITY MATRIX (JAVA 7 vs JAVA 8):");
        System.out.println("+-------------------+-------------------+-------------------+");
        System.out.println("| Scenario          | Java 7 (LinkedList| Java 8+ (TreeBin) |");
        System.out.println("+-------------------+-------------------+-------------------+");
        System.out.println("| Best Case         | O(1)              | O(1)              |");
        System.out.println("| Average Case      | O(1)              | O(1)              |");
        System.out.println("| Worst Case (DoS)  | O(n) (Linear Crawl| O(log n) (Balanced|");
        System.out.println("+-------------------+-------------------+-------------------+");

        System.out.println("\n>>> MATHEMATICAL IMPACT OF O(log n) TREEIFICATION:");
        System.out.println("  - Suppose an attacker injects 10,000 keys with identical hashCodes:");
        System.out.println("  - In Java 7: 'get(key)' performs up to 10,000 node equals() checks (Server CPU spikes to 100%!).");
        System.out.println("  - In Java 8+: 'get(key)' performs at most ~14 Red-Black tree comparisons (log2(10000) ~ 13.3)!");
        System.out.println("  - Improvement Factor: 10,000 / 14 = Over 700x faster under catastrophic worst-case collisions!");

        System.out.println("\n==========================================================================");
    }
}