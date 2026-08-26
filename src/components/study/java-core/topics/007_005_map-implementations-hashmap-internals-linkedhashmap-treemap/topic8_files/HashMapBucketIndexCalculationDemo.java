/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 8: Bucket Index Calculation: Bitwise AND 'index = (n - 1) & hash' Mathematics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class HashMapBucketIndexCalculationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: BUCKET INDEX CALCULATION '(n - 1) & hash' - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int tableLength = 16; // n = 16
        int bitmask = tableLength - 1; // n - 1 = 15 (binary: 0000 1111)

        String[] keys = {"Swadeep", "Tuhina", "Abhronila", "Debangshu"};

        System.out.println(">>> 1. Tracing Index Calculation for Table Length 16 (Bitmask 15):");
        for (String key : keys) {
            int h = key.hashCode();
            int hash = h ^ (h >>> 16);
            int index = bitmask & hash; // Equivalent to hash % tableLength, but 30x faster!

            System.out.printf("  Key: %-10s | Hash: %10d | (15 & hash) -> Bucket Index: %2d%n",
                    key, hash, index);
        }

        System.out.println("\n>>> MATHEMATICAL PROOF OF EQUIVALENCE TO MODULO:");
        System.out.println("  - When 'n' is a power of 2 (e.g. 16 = 2^4):");
        System.out.println("  - '(hash % n)' gives the remainder when dividing by 16 (range 0 to 15).");
        System.out.println("  - In binary, dividing by 2^4 is equivalent to dropping all bits except the last 4 bits.");
        System.out.println("  - '(15 & hash)' zeroes out all bits above bit 3, preserving EXACTLY the last 4 bits.");
        System.out.println("  - Result: '(n - 1) & hash' is 100% mathematically identical to 'hash % n'!");

        System.out.println("\n==========================================================================");
    }
}