/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 15: The MAT Leak Suspects Report - Automated Memory Hog Diagnosis
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class MatLeakSuspectsReportDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: THE MAT LEAK SUSPECTS REPORT - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> SAMPLE MAT LEAK SUSPECTS REPORT OUTPUT:");
        System.out.println("  ┌─────────────────────────────────────────────────────────────────────────────┐");
        System.out.println("  │ Problem Suspect 1:                                                          │");
        System.out.println("  │ The instance 'com.coderaccotax...StudentRegistryService' loaded by          │");
        System.out.println("  │ 'jdk.internal.loader.ClassLoaders$AppClassLoader' occupies 3,450,120,400    │");
        System.out.println("  │ bytes (82.45% of the total heap).                                           │");
        System.out.println("  │                                                                             │");
        System.out.println("  │ Keywords:                                                                   │");
        System.out.println("  │   - com.coderaccotax.javatutorial.profiling.StudentRegistryService          │");
        System.out.println("  │   - java.util.concurrent.ConcurrentHashMap$Node[]                          │");
        System.out.println("  └─────────────────────────────────────────────────────────────────────────────┘\n");

        System.out.println(">>> ACTIONABLE NEXT STEPS FROM THE REPORT:");
        System.out.println("  1. Click 'Details' on Problem Suspect 1.");
        System.out.println("  2. View the Shortest Path to GC Roots to find the field holding the map.");
        System.out.println("  3. Inspect Map key/value contents to verify what data leaked.");
        System.out.println("==========================================================================");
    }
}
