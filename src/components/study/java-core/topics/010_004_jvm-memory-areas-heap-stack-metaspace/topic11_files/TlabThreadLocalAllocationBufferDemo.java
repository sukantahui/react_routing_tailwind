/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 11: Thread Local Allocation Buffer (TLAB) - Lock-Free Object Creation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class TlabThreadLocalAllocationBufferDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: TLAB (THREAD LOCAL ALLOCATION BUFFER) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CONCURRENCY ALLOCATION PROBLEM:");
        System.out.println("  - Without TLAB: Every thread allocating an object in Eden must synchronize on a global heap allocation pointer.");
        System.out.println("  - Result: Severe lock contention, CPU cache misses, and poor multi-threaded throughput!\n");

        System.out.println(">>> THE TLAB SOLUTION:");
        System.out.println("  1. The JVM assigns a dedicated, small region of Eden space (a TLAB) to each individual thread.");
        System.out.println("  2. When Thread A creates 'new Student()', it allocates exclusively from its private TLAB using a simple 'bump-the-pointer' assembly instruction.");
        System.out.println("  3. ZERO synchronization locks or atomic CAS operations are required!");
        System.out.println("  4. When Thread A's TLAB is exhausted, it synchronizes ONCE to request a new TLAB block from Eden.\n");

        System.out.println(">>> TLAB TUNING FLAGS:");
        System.out.println("  - Enabled by Default : -XX:+UseTLAB");
        System.out.println("  - Diagnostic Logging : -XX:+PrintTLAB (in debug builds)");
        System.out.println("==========================================================================");
    }
}
