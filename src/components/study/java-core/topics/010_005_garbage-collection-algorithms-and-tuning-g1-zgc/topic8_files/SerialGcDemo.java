/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 8: Serial Garbage Collector - Single-Threaded Embedded Collector
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class SerialGcDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: SERIAL GARBAGE COLLECTOR (-XX:+UseSerialGC) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> CHARACTERISTICS OF SERIAL GC:");
        System.out.println("  1. Single-Threaded Execution : Uses exactly 1 GC thread; stops all application threads during GC.");
        System.out.println("  2. Algorithm on Young Gen    : Single-threaded Copying algorithm.");
        System.out.println("  3. Algorithm on Old Gen      : Single-threaded Mark-Sweep-Compact algorithm.");
        System.out.println("  4. Zero Coordination Lock   : No thread synchronization overhead among GC workers!\n");

        System.out.println(">>> IDEAL PRODUCTION USE CASES FOR SERIAL GC:");
        System.out.println("  - Small CLI Utilities & Scripting tools.");
        System.out.println("  - Single-Core Virtual Machines / Cloud containers (<1 CPU, <512MB RAM).");
        System.out.println("  - Serverless Functions (AWS Lambda / Google Cloud Run with 128MB RAM).");
        System.out.println("  - Embedded Java & IoT devices.");

        System.out.println("\n==========================================================================");
    }
}
