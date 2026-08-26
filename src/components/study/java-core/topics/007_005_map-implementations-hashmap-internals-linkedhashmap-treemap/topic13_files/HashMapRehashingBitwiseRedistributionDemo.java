/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 13: Rehashing & Resizing: Doubling (2x) & Bitwise Node Redistribution ((e.hash & oldCap) == 0)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class HashMapRehashingBitwiseRedistributionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: HashMap REHASHING & (e.hash & oldCap) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int oldCap = 16; // Binary: 0001 0000 (Bit 4 is the new distinguishing bit)
        int newCap = 32; // Binary: 0010 0000

        // Suppose we have two keys that collided in Bucket 5 of the old table (oldCap 16):
        int hash1 = 5;  // Binary: 0000 0101 (Bit 4 is 0)
        int hash2 = 21; // Binary: 0001 0101 (Bit 4 is 1)

        System.out.println(">>> 1. Old Table (Capacity 16, Bitmask 15 = 0000 1111):");
        System.out.printf("  Hash %2d: (15 & %2d) -> Old Bucket %d%n", hash1, hash1, (15 & hash1));
        System.out.printf("  Hash %2d: (15 & %2d) -> Old Bucket %d (Collided in same bucket!)%n", hash2, hash2, (15 & hash2));

        System.out.println("\n>>> 2. Java 8+ Resizing Bitwise Test '(e.hash & oldCap)':");
        boolean staysInLowBucket = (hash1 & oldCap) == 0;
        boolean movesToHighBucket = (hash2 & oldCap) != 0;

        System.out.printf("  Hash %2d & 16: %d -> Stays in same index? %b (New Index: %d)%n",
                hash1, (hash1 & oldCap), staysInLowBucket, (staysInLowBucket ? 5 : 5 + oldCap));
        System.out.printf("  Hash %2d & 16: %d -> Moves to high index? %b (New Index: %d)%n",
                hash2, (hash2 & oldCap), movesToHighBucket, (movesToHighBucket ? 5 + oldCap : 5));

        System.out.println("\n>>> ELEGANT JAVA 8 RESIZE ALGORITHM (NO RE-HASHING!):");
        System.out.println("  1. In Java 7: Every node had its hash re-computed and re-moduloed (slow & reversed list order causing infinite loops in multi-threading).");
        System.out.println("  2. In Java 8: Nodes are split into two sub-lists (loHead/loTail and hiHead/hiTail) using '(e.hash & oldCap) == 0'.");
        System.out.println("  3. If (hash & oldCap) == 0 -> node stays at 'index' in new table.");
        System.out.println("  4. If (hash & oldCap) != 0 -> node moves to 'index + oldCap' in new table (Zero re-hashing math!).");

        System.out.println("\n==========================================================================");
    }
}