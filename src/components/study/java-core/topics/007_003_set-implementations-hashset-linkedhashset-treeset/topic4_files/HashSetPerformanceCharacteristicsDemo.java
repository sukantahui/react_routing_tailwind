/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 4: HashSet Performance: O(1) Constant Time add(), remove(), contains() Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashSet;
import java.util.Set;

public class HashSetPerformanceCharacteristicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: HashSet O(1) PERFORMANCE PROFILE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Set<Integer> largeHashSet = new HashSet<>(150000);
        for (int i = 0; i < 100000; i++) largeHashSet.add(i);

        // 1. O(1) CONTAINS CHECK (Hash Bucket Direct Jump):
        long t1 = System.nanoTime();
        boolean found = largeHashSet.contains(75000); // Directly hashes to bucket!
        long t2 = System.nanoTime();
        System.out.printf(">>> 1. O(1) Membership Lookup (contains(75000)): %b (%d ns)%n", found, (t2 - t1));

        // 2. O(1) REMOVAL (Hash Bucket Direct Unlink):
        long t3 = System.nanoTime();
        boolean removed = largeHashSet.remove(75000);
        long t4 = System.nanoTime();
        System.out.printf(">>> 2. O(1) Removal (remove(75000))            : %b (%d ns)%n", removed, (t4 - t3));

        System.out.println("\n>>> WHY HashSet DELIVERS TRUE O(1) CONSTANT TIME:");
        System.out.println("  1. No Sequential Scanning: Does not walk through 100,000 elements like ArrayList.");
        System.out.println("  2. Direct Array Indexing : 'bucketIndex = (table.length - 1) & hash' jumps directly to the target memory slot!");
        System.out.println("  3. Load Factor & TreeBins: Rehashes at 0.75 load factor and turns long bucket chains into O(log n) Red-Black trees if collisions exceed 8!");

        System.out.println("\n==========================================================================");
    }
}