/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 11: The jstat Utility - Real-Time Live GC Statistics Monitoring
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class JstatUtilityGcStatsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: THE JSTAT UTILITY (-gcutil) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. RUNNING JSTAT MONITORING IN TERMINAL:");
        System.out.println("  Command: jstat -gcutil <pid> 1000 5 (Polls every 1000ms for 5 iterations)\n");

        System.out.println(">>> 2. DECODING THE JSTAT OUTPUT COLUMNS:");
        System.out.println("  S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT");
        System.out.println("  0.00  95.42  45.10  28.30  94.20  88.10    14    0.045     0    0.000   0.045\n");

        System.out.println(">>> COLUMN DEFINITIONS:");
        System.out.println("  - S0 / S1 : Survivor 0 / Survivor 1 space utilization percentage.");
        System.out.println("  - E       : Eden space utilization percentage (sawtooth cycle: 0 -> 100%).");
        System.out.println("  - O       : Old / Tenured generation utilization percentage.");
        System.out.println("  - M       : Metaspace utilization percentage.");
        System.out.println("  - YGC     : Young Generation GC event count (14 Minor GCs).");
        System.out.println("  - YGCT    : Young Generation GC total time (0.045 seconds total).");
        System.out.println("  - FGC     : Full GC event count (0 Full GCs = Healthy!).");
        System.out.println("  - GCT     : Total Garbage Collection time.");

        System.out.println("\n==========================================================================");
    }
}
