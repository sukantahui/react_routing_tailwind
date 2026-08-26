/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 1: Method Area & Metaspace - Shared Class Metadata Storage
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryPoolMXBean;

public class MethodAreaMetaspaceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: METHOD AREA & METASPACE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. INSPECTING RUNTIME METASPACE POOL METRICS:");
        for (MemoryPoolMXBean pool : ManagementFactory.getMemoryPoolMXBeans()) {
            if (pool.getName().toLowerCase().contains("metaspace")) {
                System.out.println("  - Pool Name    : " + pool.getName());
                System.out.println("  - Memory Type  : " + pool.getType() + " (Non-Heap / Native Memory)");
                System.out.println("  - Used Memory  : " + (pool.getUsage().getUsed() / (1024 * 1024)) + " MB");
                System.out.println("  - Committed    : " + (pool.getUsage().getCommitted() / (1024 * 1024)) + " MB");
            }
        }

        System.out.println("\n>>> WHAT RESIDES INSIDE METASPACE:");
        System.out.println("  1. Klass Metadata Structures (Method tables, vtables, itables).");
        System.out.println("  2. Runtime Constant Pool (Literal constants, method/field references).");
        System.out.println("  3. Method Bytecode Arrays & JIT compiled code pointers.");
        System.out.println("  4. Annotations metadata.");
        System.out.println("==========================================================================");
    }
}
