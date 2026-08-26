/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 1: Common Causes of Memory Leaks - The 6 Classic Antipatterns
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class CommonCausesMemoryLeaksDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: COMMON CAUSES OF MEMORY LEAKS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 6 CLASSIC JAVA MEMORY LEAK ANTIPATTERNS:");
        System.out.println("  1. STATIC CACHES           : Static Maps/Lists accumulating data without TTL or eviction (LRU).");
        System.out.println("  2. UNREGISTERED LISTENERS  : Adding event listeners to long-lived broadcasters without removing them.");
        System.out.println("  3. BROKEN HASH KEYS        : Mutating HashMap/HashSet key fields after insertion (lost entries).");
        System.out.println("  4. NON-STATIC INNER CLASSES: Anonymous inner classes holding hidden references to outer instances.");
        System.out.println("  5. THREADLOCAL IN POOLS    : Failing to call ThreadLocal.remove() on pooled worker threads.");
        System.out.println("  6. UNCLOSED NATIVE HANDLES : Leaking DirectByteBuffers, file descriptors, and JDBC connections.");

        System.out.println("\n==========================================================================");
    }
}
