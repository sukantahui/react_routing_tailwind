/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 13: Configuring Automatic Heap Dump on Crash (-XX:+HeapDumpOnOutOfMemoryError)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class HeapDumpOnOomDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: AUTOMATIC HEAP DUMP ON CRASH - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE MANDATORY PRODUCTION POST-MORTEM FLAGS:");
        System.out.println("  1. Enable Heap Dump on OOM : -XX:+HeapDumpOnOutOfMemoryError");
        System.out.println("  2. Specify Target File Path: -XX:HeapDumpPath=/var/log/dumps/app_oom.hprof");
        System.out.println("  3. Exit Container on OOM   : -XX:+ExitOnOutOfMemoryError (triggers Kubernetes pod restart)\n");

        System.out.println(">>> WHAT AN HPROF FILE CONTAINS:");
        System.out.println("  - Exact binary snapshot of EVERY object instance on the heap at the moment of failure.");
        System.out.println("  - Complete reference graph connecting GC Roots to leaked objects.");
        System.out.println("  - Field values, string contents, and array payloads.");
        System.out.println("  - Thread stack traces active when OOM occurred.");

        System.out.println("\n==========================================================================");
    }
}
