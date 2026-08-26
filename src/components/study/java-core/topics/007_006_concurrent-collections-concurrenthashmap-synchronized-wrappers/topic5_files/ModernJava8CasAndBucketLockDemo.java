/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 5: Modern ConcurrentHashMap (Java 8+): CAS Insertion & Synchronized Bucket Head
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.concurrent.ConcurrentHashMap;

public class ModernJava8CasAndBucketLockDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: MODERN JAVA 8+ CAS & BUCKET HEAD SYNCHRONIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentHashMap<String, String> centerMap = new ConcurrentHashMap<>();

        // 1. SCENARIO A: Inserting into an EMPTY bucket (Lock-Free CAS):
        centerMap.put("BRK-1", "Barrackpore Head Office"); // Uses CAS (casTabAt) with ZERO locks!

        // 2. SCENARIO B: Inserting into an OCCUPIED bucket (Fine-grained synchronized lock):
        centerMap.put("BRK-1", "Barrackpore Main Office"); // Synchronizes ONLY on the head Node of BRK-1's bucket!

        System.out.println(">>> 1. Map State: " + centerMap);

        System.out.println("\n>>> THE 2-TIER JAVA 8+ MUTATION ALGORITHM:");
        System.out.println("  1. If Bucket is EMPTY (null):");
        System.out.println("     - Java executes 'casTabAt(tab, i, null, new Node(hash, key, value))'.");
        System.out.println("     - Compare-And-Swap (CAS) uses CPU hardware atomic instructions with ZERO locking overhead!");
        System.out.println();
        System.out.println("  2. If Bucket is OCCUPIED (collision):");
        System.out.println("     - Java acquires a 'synchronized(f)' lock ONLY on the first Node 'f' of that bucket.");
        System.out.println("     - All other buckets (e.g. 15 out of 16 buckets) remain 100% unlocked and available for other threads!");
        System.out.println("     - If bucket chain reaches 8 nodes, converts to Red-Black Tree (TreeBin) protected by TreeNode locks.");

        System.out.println("\n==========================================================================");
    }
}