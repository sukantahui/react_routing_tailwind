/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 0: The Fundamental Limitations of Platform (OS) Threads: 1:1 Kernel Binding & Memory Walls
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class PlatformThreadsLimitationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: PLATFORM (OS) THREAD BOTTLENECKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 FATAL BOTTLENECKS OF PLATFORM (OS) THREADS (Java 1.0 - 20):");
        System.out.println();
        System.out.println("  1. 1:1 Kernel Mapping:");
        System.out.println("     - Every 'java.lang.Thread' is a thin wrapper around a physical OS Kernel Thread.");
        System.out.println("     - Creating, switching, and destroying threads requires expensive OS kernel context switches (~1–2 microseconds per switch).");
        System.out.println();
        System.out.println("  2. Massive Memory Footprint (~1 MB Call Stack):");
        System.out.println("     - The OS allocates a static ~1 MB stack per platform thread, regardless of how simple the task is.");
        System.out.println("     - 5,000 threads = ~5 GB of native RAM consumed by idle stacks alone!");
        System.out.println();
        System.out.println("  3. Scalability Ceiling (~5,000–10,000 Threads Max):");
        System.out.println("     - Most Linux/Windows production servers exhaust OS file descriptors and memory beyond 5,000 platform threads.");
        System.out.println();
        System.out.println(">>> THE REVOLUTION: PROJECT LOOM & VIRTUAL THREADS (Java 21+ LTS)!");

        System.out.println("\n==========================================================================");
    }
}