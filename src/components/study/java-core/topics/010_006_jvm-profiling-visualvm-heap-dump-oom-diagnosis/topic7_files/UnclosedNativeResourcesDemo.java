/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 7: Unclosed Native Resources - Off-Heap & File Descriptor Leaks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.nio.ByteBuffer;

public class UnclosedNativeResourcesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: UNCLOSED NATIVE RESOURCES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. ALLOCATING DIRECT (OFF-HEAP) MEMORY:");
        // Allocates 10MB of native C memory outside the Java Heap via malloc():
        ByteBuffer offHeapBuffer = ByteBuffer.allocateDirect(1024 * 1024 * 10);
        System.out.println("  - Allocated 10 MB in Native Off-Heap OS Memory: " + offHeapBuffer.isDirect());

        System.out.println("\n>>> DANGERS OF OFF-HEAP & RESOURCE LEAKS:");
        System.out.println("  1. INVISIBLE TO HEAP GC: Native memory usage does NOT show up in Java Heap graphs.");
        System.out.println("  2. FILE DESCRIPTOR EXHAUSTION: Unclosed sockets/files trigger 'java.io.IOException: Too many open files'.");
        System.out.println("  3. OS OOM KILLER: Linux cgroups kill the container when process RSS exceeds RAM limit!\n");

        System.out.println(">>> BEST PRACTICE:");
        System.out.println("  - Always use Try-With-Resources for all AutoCloseable resources (streams, connections, channels).");
        System.out.println("  - Size direct memory via '-XX:MaxDirectMemorySize=512m'.");

        System.out.println("\n==========================================================================");
    }
}
