/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 10: Why ArrayList Outperforms LinkedList in Modern Enterprise JVM Workloads
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class WhyArrayListWinsRealWorldAnalysisDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: WHY ArrayList WINS IN REAL-WORLD WORKLOADS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 4 REASONS WHY LINKEDLIST IS RARELY USED IN PRODUCTION JAVA:");
        System.out.println("  1. Memory Bloat & GC Pressure:");
        System.out.println("     - ArrayList  : 1 single array object wrapping elements.");
        System.out.println("     - LinkedList : 1,000,000 elements = 1,000,000 distinct Node objects!");
        System.out.println("     - Garbage collector must scan and collect 1 million node references, causing GC pauses.");
        System.out.println();
        System.out.println("  2. CPU Cache Locality (Cache Thrashing):");
        System.out.println("     - Modern Intel/AMD/ARM CPUs operate at 4.5 GHz, while RAM operates at a fraction of that speed.");
        System.out.println("     - ArrayList contiguous memory allows hardware vector prefetching.");
        System.out.println("     - LinkedList pointer jumping causes CPU stalls waiting for main memory.");
        System.out.println();
        System.out.println("  3. Even for 'Middle Insertions', ArrayList often wins:");
        System.out.println("     - To insert into LinkedList middle: must walk O(n/2) pointers to FIND the position!");
        System.out.println("     - Finding the position in LinkedList takes longer than System.arraycopy in ArrayList!");
        System.out.println();
        System.out.println("  4. If you need Head/Tail operations, use ArrayDeque (not LinkedList):");
        System.out.println("     - ArrayDeque uses a circular contiguous array buffer: O(1) head/tail with zero node overhead!");

        System.out.println("\n==========================================================================");
    }
}