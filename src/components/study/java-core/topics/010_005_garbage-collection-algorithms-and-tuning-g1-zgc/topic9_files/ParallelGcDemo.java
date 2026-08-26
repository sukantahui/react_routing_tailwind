/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 9: Parallel Garbage Collector - High-Throughput Batch Processing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class ParallelGcDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: PARALLEL GC (-XX:+UseParallelGC) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> CHARACTERISTICS OF PARALLEL GC (Throughput Collector):");
        System.out.println("  1. Multi-Threaded Collection : Spawns N worker threads (matching CPU cores) during STW pauses.");
        System.out.println("  2. Focus on Throughput       : Sacrifices pause latency to maximize the % of CPU time given to user code.");
        System.out.println("  3. Young Gen Algorithm       : Parallel Scavenge (Multi-threaded Copying).");
        System.out.println("  4. Old Gen Algorithm         : Parallel Old (Multi-threaded Mark-Compact).\n");

        System.out.println(">>> PARALLEL GC TUNING FLAGS:");
        System.out.println("  - Enable Collector           : -XX:+UseParallelGC");
        System.out.println("  - Set Worker Threads         : -XX:ParallelGCThreads=8");
        System.out.println("  - Target Max Pause Time      : -XX:MaxGCPauseMillis=200");
        System.out.println("  - Target Throughput Ratio    : -XX:GCTimeRatio=19 (95% app time / 5% GC time)");

        System.out.println("\n==========================================================================");
    }
}
