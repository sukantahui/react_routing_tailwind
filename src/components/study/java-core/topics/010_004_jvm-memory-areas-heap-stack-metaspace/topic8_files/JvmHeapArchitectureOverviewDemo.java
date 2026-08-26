/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 8: JVM Heap Architecture - The Generational Memory Model
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryPoolMXBean;

public class JvmHeapArchitectureOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: JVM HEAP GENERATIONAL MODEL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. INSPECTING HEAP GENERATION MEMORY POOLS:");
        for (MemoryPoolMXBean pool : ManagementFactory.getMemoryPoolMXBeans()) {
            if (pool.getName().toLowerCase().contains("eden") ||
                pool.getName().toLowerCase().contains("survivor") ||
                pool.getName().toLowerCase().contains("old") ||
                pool.getName().toLowerCase().contains("tenured")) {
                System.out.println("  - Pool: " + pool.getName() + " | Used: " + (pool.getUsage().getUsed() / (1024 * 1024)) + " MB");
            }
        }

        System.out.println("\n>>> THE WEAK GENERATIONAL HYPOTHESIS:");
        System.out.println("  1. Most allocated objects (iterators, DTOs, buffers) die shortly after creation (95%+ mortality rate).");
        System.out.println("  2. Very few references exist from older generation objects to younger generation objects.\n");

        System.out.println(">>> HEAP DIVISION STRUCTURE:");
        System.out.println("  [ HEAP MEMORY ]");
        System.out.println("    ├── YOUNG GENERATION (Eden + Survivor 0 + Survivor 1) -> Cleaned via Minor GC (Fast & Frequent)");
        System.out.println("    └── OLD / TENURED GENERATION (Long-lived objects)     -> Cleaned via Major / Full GC (Thorough)");
        System.out.println("==========================================================================");
    }
}
