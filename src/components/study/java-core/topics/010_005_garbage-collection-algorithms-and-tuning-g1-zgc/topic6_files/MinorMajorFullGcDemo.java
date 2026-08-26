/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 6: Minor GC vs Major GC vs Full GC - Scopes & Latency
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class MinorMajorFullGcDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: MINOR GC VS MAJOR GC VS FULL GC - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 LEVELS OF GARBAGE COLLECTION:");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  GC TYPE         TARGET SCOPE            TRIGGER                          TYPICAL LATENCY");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  Minor GC        Young Gen (Eden + S0/S1) Eden space is full              1ms - 10ms (Ultra-Fast)");
        System.out.println("  Major GC        Old Gen (Tenured)        Old Gen allocation threshold    100ms - 500ms");
        System.out.println("  Full GC         Entire Heap + Metaspace  Metaspace full / Promotion fail 500ms - 10,000ms+ (Painful!)");
        System.out.println("  --------------------------------------------------------------------------------------------------\n");

        System.out.println(">>> COMMON TRIGGERS OF UNEXPECTED FULL GC:");
        System.out.println("  1. Metaspace exhaustion (Classloader leaks).");
        System.out.println("  2. Concurrent Mode Failure in G1/CMS (Heap allocation rate faster than concurrent marking).");
        System.out.println("  3. Promotion Failure (Old Gen too fragmented to fit promoted objects).");
        System.out.println("  4. Explicit 'System.gc()' calls in third-party libraries.");
        System.out.println("==========================================================================");
    }
}
