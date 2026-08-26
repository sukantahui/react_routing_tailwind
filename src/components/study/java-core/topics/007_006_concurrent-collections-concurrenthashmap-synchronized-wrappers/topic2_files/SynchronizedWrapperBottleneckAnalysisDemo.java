/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 2: Bottleneck of Synchronized Wrappers: Coarse-Grained Whole-Map Lock Contention
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class SynchronizedWrapperBottleneckAnalysisDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: SYNCHRONIZED WRAPPER LOCK CONTENTION BOTTLENECK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE ARCHITECTURAL DEFECT OF SYNCHRONIZED WRAPPERS (AND Hashtable):");
        System.out.println("  - Imagine an office building with 100 rooms, but only 1 master door key!");
        System.out.println("  - Even if 50 people want to work in 50 completely different rooms (different buckets):");
        System.out.println("  - ONLY ONE PERSON CAN ENTER THE BUILDING AT A TIME!");
        System.out.println("  - All other 49 people are blocked in the hallway (WAITING state) wasting CPU power!");
        System.out.println();
        System.out.println(">>> 3 CRIPPLING BOTTLENECK CHARACTERISTICS:");
        System.out.println("  1. Whole-Map Coarse Lock  : A single mutex locks the ENTIRE map object for all operations.");
        System.out.println("  2. Read-Blocks-Read Contention: Even when 16 CPU cores only want to READ ('get()'), only 1 thread can read at a time!");
        System.out.println("  3. Scalability Collapse   : Adding more CPU cores actually DEGRADES throughput due to thread context switching overhead!");

        System.out.println("\n>>> SOLUTION: ConcurrentHashMap (Fine-Grained Bucket Locks & Lock-Free Reads)");

        System.out.println("\n==========================================================================");
    }
}