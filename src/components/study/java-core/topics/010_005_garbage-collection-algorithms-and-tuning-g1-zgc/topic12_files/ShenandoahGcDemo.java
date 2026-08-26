/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 12: Shenandoah Garbage Collector - Concurrent Compaction
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class ShenandoahGcDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: SHENANDOAH GC (-XX:+UseShenandoahGC) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY ATTRIBUTES OF SHENANDOAH GC:");
        System.out.println("  1. Ultra-Low Latency        : Keeps STW pauses under a few milliseconds regardless of heap size.");
        System.out.println("  2. Concurrent Evacuation    : Moves live objects concurrently while application threads write/read.");
        System.out.println("  3. Load-Reference Barriers  : Intercepts object references to ensure mutators always see the new copy.\n");

        System.out.println(">>> SHENANDOAH VS ZGC:");
        System.out.println("  - Shenandoah was developed by Red Hat and integrated into OpenJDK.");
        System.out.println("  - ZGC was developed by Oracle (now supporting Generational ZGC in Java 21).");
        System.out.println("  - Both deliver ultra-low latency; Shenandoah does not require colored pointer hardware bit manipulation.");

        System.out.println("\n==========================================================================");
    }
}
