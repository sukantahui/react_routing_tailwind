/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 11: ZGC - Ultra-Low Latency Sub-Millisecond Garbage Collector (Java 15+ Production)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class ZgcSubmillisecondPausesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: ZGC (ULTRA-LOW LATENCY GC) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 TECHNOLOGICAL PILLARS OF ZGC:");
        System.out.println("  1. COLORED POINTERS : Uses reference address metadata bits (Marked0, Marked1, Remapped) directly in 64-bit pointers.");
        System.out.println("  2. LOAD BARRIERS    : When application dereferences a pointer, Load Barrier detects if object was relocated and self-heals the pointer!");
        System.out.println("  3. CONCURRENT WORK  : Marking, Relocation, and Compaction ALL happen concurrently while user threads run!\n");

        System.out.println(">>> ZGC PERFORMANCE SPECS (Java 21 Generational ZGC):");
        System.out.println("  - Typical STW Pause Time : Under 1 millisecond (< 1ms) regardless of heap size!");
        System.out.println("  - Supported Heap Range   : 16 MB up to 16 TERABYTES (16 TB).");
        System.out.println("  - Generational ZGC       : Standard in Java 21+ (-XX:+UseZGC -XX:+ZGenerational).\n");

        System.out.println(">>> ENABLING ZGC:");
        System.out.println("  - java -XX:+UseZGC -Xms16g -Xmx16g -jar trading-engine.jar");
        System.out.println("==========================================================================");
    }
}
