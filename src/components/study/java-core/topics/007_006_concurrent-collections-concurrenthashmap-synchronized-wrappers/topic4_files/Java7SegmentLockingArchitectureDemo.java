/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 4: Historical ConcurrentHashMap (Java 7): Segment Locking & ConcurrencyLevel
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class Java7SegmentLockingArchitectureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: JAVA 7 ConcurrentHashMap SEGMENT LOCKING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HISTORICAL ARCHITECTURE (JAVA 7 CONCURRENTHASHMAP):");
        System.out.println("  1. Segment Array     : 'final Segment<K,V>[] segments' (Default size: 16).");
        System.out.println("  2. Segment Class     : Each Segment literally extended 'ReentrantLock' and owned its own internal HashEntry[] table!");
        System.out.println("  3. ConcurrencyLevel  : The default concurrency level was 16, allowing up to 16 concurrent write threads simultaneously.");
        System.out.println("  4. Two-Level Hashing : The key hash was first used to find the Segment index, then used inside the segment to find the bucket index.");
        System.out.println();
        System.out.println(">>> WHY JAVA 8 ABANDONED SEGMENT LOCKING:");
        System.out.println("  - Memory Overhead: Allocating 16 separate Segment objects and 16 separate HashEntry tables created massive heap memory bloat for small maps.");
        System.out.println("  - Concurrency Bottleneck: Concurrency was strictly capped at 16 segments (unless manually tuned). Multiple keys in the same segment still blocked each other.");
        System.out.println("  - Java 8 Solution: Replaced Segment objects with direct bucket-level locks and CAS operations!");

        System.out.println("\n==========================================================================");
    }
}