/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 14: Heap Sizing Flags - -Xms, -Xmx & -Xmn Sizing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class HeapSizingFlagsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: HEAP SIZING FLAGS (-Xms, -Xmx, -Xmn) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runtime rt = Runtime.getRuntime();
        long totalMB = rt.totalMemory() / (1024 * 1024);
        long maxMB = rt.maxMemory() / (1024 * 1024);
        long freeMB = rt.freeMemory() / (1024 * 1024);

        System.out.println(">>> 1. CURRENT JVM HEAP METRICS:");
        System.out.println("  - Total Heap Allocated (-Xms) : " + totalMB + " MB");
        System.out.println("  - Maximum Heap Ceiling (-Xmx) : " + maxMB + " MB");
        System.out.println("  - Free Memory in Heap         : " + freeMB + " MB\n");

        System.out.println(">>> 2. HEAP SIZING COMMAND LINE CHEATSHEET:");
        System.out.println("  - Fixed 4GB Heap       : java -Xms4g -Xmx4g -jar app.jar");
        System.out.println("  - Fixed 2GB Young Gen  : java -Xms4g -Xmx4g -Xmn2g -jar app.jar");
        System.out.println("  - Container Sizing (8GB RAM host): Allocate 75% to JVM Heap (-Xms6g -Xmx6g) leaving 25% for Metaspace/OS.");

        System.out.println("\n==========================================================================");
    }
}
