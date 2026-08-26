/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 7: Metaspace Memory Management - Sizing & Container Tuning
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryPoolMXBean;

public class MetaspaceMemoryManagementDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: METASPACE MEMORY MANAGEMENT - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. CRITICAL METASPACE TUNING FLAGS (DOCKER / KUBERNETES):");
        System.out.println("  1. -XX:MetaspaceSize=<size>     : Initial High-Watermark threshold that triggers initial Metaspace GC (e.g. 128m).");
        System.out.println("  2. -XX:MaxMetaspaceSize=<size>  : Maximum ceiling for Metaspace allocation (e.g. 256m).");
        System.out.println("  3. -XX:MinMetaspaceFreeRatio    : Minimum percentage of free Metaspace capacity after GC.");
        System.out.println("  4. -XX:MaxMetaspaceFreeRatio    : Maximum percentage of free Metaspace capacity after GC.\n");

        System.out.println(">>> 2. DIAGNOSING 'java.lang.OutOfMemoryError: Metaspace':");
        System.out.println("  - Common Root Cause #1: Classloader Leaks (e.g. repeated Tomcat/Spring context reloading).");
        System.out.println("  - Common Root Cause #2: Excessive runtime dynamic bytecode generation (CGLIB / Javassist without caching).");
        System.out.println("  - Solution: Profile classloader counts with 'jcmd <pid> VM.classloader_stats'.");

        System.out.println("\n==========================================================================");
    }
}
