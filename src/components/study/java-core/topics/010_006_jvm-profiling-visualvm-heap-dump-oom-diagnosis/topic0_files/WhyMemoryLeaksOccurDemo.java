/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 0: Why Memory Leaks Occur in Java - Unintentional Object Retention
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.util.ArrayList;
import java.util.List;

public class WhyMemoryLeaksOccurDemo {

    // Simulating a lingering static reference (Memory Leak Root Cause):
    private static final List<byte[]> LINGERING_LEAK_HOLDER = new ArrayList<>();

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY MEMORY LEAKS OCCUR IN JAVA - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS A JAVA MEMORY LEAK (Unintentional Object Retention):");
        System.out.println("  - In C/C++: Memory leak occurs when allocated memory is forgotten without 'free()'.");
        System.out.println("  - In Java  : Memory leak occurs when an object is logically dead, but a live reference (GC Root) prevents GC from reclaiming it!\n");

        // Simulating memory accumulation:
        for (int i = 1; i <= 5; i++) {
            LINGERING_LEAK_HOLDER.add(new byte[1024 * 1024]); // 1MB each
            System.out.println("  - Accumulated leaked block #" + i + " (Held by static GC Root)");
        }

        System.out.println("\n>>> THE DANGER:");
        System.out.println("  - As long as LINGERING_LEAK_HOLDER exists, these 5MB cannot be freed.");
        System.out.println("  - Over days/weeks in production, this causes 'OutOfMemoryError: Java heap space'!");
        System.out.println("==========================================================================");
    }
}
