/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 13: TreeSet Performance: O(log n) Time Complexity & Self-Balancing Tree Invariants
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.TreeSet;

public class TreeSetLogNPerformanceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: TreeSet O(log n) PERFORMANCE PROFILE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TreeSet<Integer> scoreTree = new TreeSet<>();
        int elementCount = 100_000;
        for (int i = 0; i < elementCount; i++) scoreTree.add(i);

        // 1. O(log n) MEMBERSHIP LOOKUP:
        long t1 = System.nanoTime();
        boolean found = scoreTree.contains(88888); // Tree height <= 2 * log2(100,000) ~ 33 node visits maximum!
        long t2 = System.nanoTime();

        System.out.printf(">>> 1. O(log n) Tree Lookup: Element found=%b (Time: %d ns)%n", found, (t2 - t1));

        System.out.println("\n>>> MATHEMATICAL COMPLEXITY OF RED-BLACK TREES:");
        System.out.println("  - Element Count (n) : 100,000");
        System.out.println("  - Binary log2(n)    : ~17 levels");
        System.out.println("  - Max Tree Height   : 2 * log2(n + 1) = ~34 comparisons maximum!");
        System.out.println("  - While HashSet is O(1) average, TreeSet guarantees O(log n) in BOTH average AND worst cases!");

        System.out.println("\n==========================================================================");
    }
}