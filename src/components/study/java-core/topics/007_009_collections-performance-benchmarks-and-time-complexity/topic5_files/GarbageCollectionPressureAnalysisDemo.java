/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 5: Garbage Collection Pressure: Node Allocations in LinkedList/TreeMap vs Arrays
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class GarbageCollectionPressureAnalysisDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: GARBAGE COLLECTION PRESSURE & HEAP FRAGMENTATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE GC HEAP BURDEN OF 1,000,000 ELEMENTS:");
        System.out.println("+-------------------+-----------------------+-----------------------+---------------------------+");
        System.out.println("| Collection        | Total Heap Objects    | GC Young Gen Pressure | Heap Fragmentation Risk   |");
        System.out.println("+-------------------+-----------------------+-----------------------+---------------------------+");
        System.out.println("| int[]             | EXACTLY 1 OBJECT!     | ZERO Pressure         | ZERO Fragmentation        |");
        System.out.println("| ArrayList<String> | 1 Array + 1M Strings  | Low Pressure          | Very Low (Linear buffer)  |");
        System.out.println("| LinkedList<String>| 1M Nodes + 1M Strings | EXTREME (2M Objects!) | HIGH (Scattered nodes)    |");
        System.out.println("| TreeMap<K, V>     | 1M Entries + 2M Obj   | EXTREME (3M Objects!) | HIGH (Tree rebalancing)   |");
        System.out.println("+-------------------+-----------------------+-----------------------+---------------------------+");

        System.out.println("\n>>> HOW NODE ALLOCATIONS DEGRADE APPLICATION LATENCY (Stop-The-World Pauses):");
        System.out.println("  1. Allocation Storm : Inserting 1,000,000 elements into LinkedList calls 'new Node()' 1,000,000 times, filling the Eden generation rapidly.");
        System.out.println("  2. GC Mark Phase    : During garbage collection, the GC must traverse and mark 1,000,000 separate object references across memory pages.");
        System.out.println("  3. GC Sweep/Compact : Moving 1,000,000 tiny objects during heap compaction takes significantly longer than copying 1 contiguous array buffer.");
        System.out.println("  4. Rule of Thumb    : In high-throughput microservices, prefer array-backed collections (ArrayList, ArrayDeque) to keep GC pause times sub-millisecond!");

        System.out.println("\n==========================================================================");
    }
}