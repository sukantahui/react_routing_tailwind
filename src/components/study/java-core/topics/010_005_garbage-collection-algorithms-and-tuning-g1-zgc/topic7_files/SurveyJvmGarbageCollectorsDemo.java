/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 7: Survey of JVM Garbage Collectors - The 5 Major Collectors
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.ManagementFactory;

public class SurveyJvmGarbageCollectorsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: SURVEY OF JVM GARBAGE COLLECTORS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. CURRENT ACTIVE GARBAGE COLLECTORS IN THIS JVM:");
        for (GarbageCollectorMXBean gc : ManagementFactory.getGarbageCollectorMXBeans()) {
            System.out.println("  - Active Collector : " + gc.getName());
            System.out.println("    Collection Count : " + gc.getCollectionCount());
            System.out.println("    Total GC Time    : " + gc.getCollectionTime() + " ms\n");
        }

        System.out.println(">>> 2. THE 5 MAJOR PRODUCTION COLLECTORS IN MODERN JAVA:");
        System.out.println("  1. Serial GC     (-XX:+UseSerialGC)    : Single-threaded; ideal for CLI tools & <512MB RAM.");
        System.out.println("  2. Parallel GC   (-XX:+UseParallelGC)  : Multi-threaded throughput champion; ideal for batch compute.");
        System.out.println("  3. G1 GC         (-XX:+UseG1GC)        : Region-based default since Java 9; balanced latency/throughput.");
        System.out.println("  4. ZGC           (-XX:+UseZGC)         : Ultra-low latency (<1ms STW); TB-scale heaps (Java 15+).");
        System.out.println("  5. Shenandoah GC (-XX:+UseShenandoahGC): Ultra-low latency concurrent compaction collector.");

        System.out.println("\n==========================================================================");
    }
}
