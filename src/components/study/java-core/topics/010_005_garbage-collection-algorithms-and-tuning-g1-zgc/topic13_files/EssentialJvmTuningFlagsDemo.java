/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 13: Essential JVM Tuning Flags - Production Playbook
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class EssentialJvmTuningFlagsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: ESSENTIAL JVM TUNING FLAGS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> PRODUCTION RECOMMENDED JVM TUNING FLAGS CHEATSHEET:");
        System.out.println("  1. HEAP SIZING:");
        System.out.println("     -Xms4g -Xmx4g                           : Lock initial and max heap to 4GB (avoids resizing).");
        System.out.println("     -XX:+AlwaysPreTouch                     : Pre-zeros memory pages at startup (eliminates runtime page faults).\n");

        System.out.println("  2. METASPACE SIZING (DOCKER / KUBERNETES):");
        System.out.println("     -XX:MetaspaceSize=128m                  : Initial high-watermark before GC.");
        System.out.println("     -XX:MaxMetaspaceSize=256m               : Prevents container OS memory starvation.\n");

        System.out.println("  3. CRASH & DUMP DIAGNOSTICS:");
        System.out.println("     -XX:+HeapDumpOnOutOfMemoryError         : Auto-captures heap snapshot on OOM.");
        System.out.println("     -XX:HeapDumpPath=/var/logs/app.hprof    : Destination path for heap dump.");
        System.out.println("     -XX:+ExitOnOutOfMemoryError             : Fast-fails unhealthy container for K8s pod restart.\n");

        System.out.println("  4. MEMORY OPTIMIZATION:");
        System.out.println("     -XX:+UseStringDeduplication             : Automatically merges duplicate String byte arrays in G1/ZGC!");

        System.out.println("\n==========================================================================");
    }
}
