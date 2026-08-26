/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 0: Modern CPU Hardware Architecture: L1/L2/L3 Caches, Write Buffers & RAM
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class CpuHardwareMemoryHierarchyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: CPU CACHE HIERARCHY & HARDWARE REALITIES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE MODERN MULTI-CORE HARDWARE MEMORY PYRAMID:");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| Hardware Level    | Typical Capacity  | Access Latency    | Shared / Private  |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| CPU Registers     | ~1 KB             | ~0.5 ns (1 cycle) | Private to Core   |");
        System.out.println("| L1 Cache (I + D)  | ~32 - 64 KB       | ~1 ns (3 cycles)  | Private to Core   |");
        System.out.println("| L2 Cache          | ~256 - 512 KB     | ~4 ns (12 cycles) | Private / Shared  |");
        System.out.println("| L3 Cache (LLC)    | ~16 - 64 MB       | ~15 ns (40 cycles)| Shared all Cores  |");
        System.out.println("| Main Memory (RAM) | ~16 - 128 GB      | ~60 - 100 ns (200)| Shared all Cores  |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println();
        System.out.println(">>> WHY HARDWARE CACHES CAUSE CONCURRENCY CHALLENGES:");
        System.out.println("  1. Speed Discrepancy : RAM is ~200x SLOWER than CPU registers! CPUs must cache variables locally to stay fast.");
        System.out.println("  2. Local Stash Hazard: Core 1 copies variable 'status = true' into its private L1 cache, but Core 2 still reads stale 'status = false' from its own private L1 cache!");
        System.out.println("  3. Hardware Barriers : Special CPU instructions (Memory Fences) are required to force caches to synchronize with main RAM.");

        System.out.println("\n==========================================================================");
    }
}