/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 14: Eclipse Memory Analyzer (MAT) - Heap Dump Analysis Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class EclipseMatOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: ECLIPSE MEMORY ANALYZER (MAT) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 CORE DIAGNOSTIC VIEWS IN ECLIPSE MAT:");
        System.out.println("  1. LEAK SUSPECTS REPORT : Automated AI-like diagnosis pointing to the single largest object trees.");
        System.out.println("  2. DOMINATOR TREE      : Hierarchical tree showing which object dominates/retains the most memory.");
        System.out.println("  3. HISTOGRAM VIEW       : Class-by-class instance counts and Retained vs Shallow heap sizes.");
        System.out.println("  4. PATH TO GC ROOTS     : The exact chain of references keeping an object alive (excluding weak/soft refs).\n");

        System.out.println(">>> HOW MAT PROCESSES DUMPS:");
        System.out.println("  - Generates fast index files (.index, .inbound, .outbound, .domTree) on initial open.");
        System.out.println("  - Allows instantaneous navigation of 64GB+ heap dumps on standard developer laptops!");

        System.out.println("\n==========================================================================");
    }
}
