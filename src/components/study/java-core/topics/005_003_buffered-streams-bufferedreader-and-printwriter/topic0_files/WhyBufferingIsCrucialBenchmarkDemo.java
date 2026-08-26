/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 0: Why Buffering is Crucial: Eliminating OS Kernel Context-Switch Overhead
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.ByteArrayInputStream;
import java.io.BufferedInputStream;

public class WhyBufferingIsCrucialBenchmarkDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY BUFFERING IS CRUCIAL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1 Megabyte simulated payload:
        byte[] payload = new byte[1_000_000];
        for (int i = 0; i < payload.length; i++) payload[i] = (byte) (i % 127);

        // BENCHMARK 1: Unbuffered Single-Byte Reading (1,000,000 separate calls!):
        long t1 = System.nanoTime();
        try (ByteArrayInputStream unbuffered = new ByteArrayInputStream(payload)) {
            int b;
            while ((b = unbuffered.read()) != -1) {
                // Simulating single-byte disk/network syscall
            }
        }
        long unbufferedDuration = System.nanoTime() - t1;

        // BENCHMARK 2: Buffered Reading with 8KB Internal Buffer (122 chunk operations!):
        long t2 = System.nanoTime();
        try (BufferedInputStream buffered = new BufferedInputStream(new ByteArrayInputStream(payload))) {
            int b;
            while ((b = buffered.read()) != -1) {
                // Served directly from fast L1/L2 CPU RAM buffer!
            }
        }
        long bufferedDuration = System.nanoTime() - t2;

        System.out.println(">>> EXECUTION BENCHMARK RESULTS (1 MB STREAM):");
        System.out.printf("  - Unbuffered Duration : %.3f ms%n", unbufferedDuration / 1_000_000.0);
        System.out.printf("  - Buffered Duration   : %.3f ms%n", bufferedDuration / 1_000_000.0);
        System.out.printf("  - Performance Boost   : ~%.1fx Faster!%n", (double) unbufferedDuration / bufferedDuration);

        System.out.println("\n>>> THE KERNEL SYSCALL BOTTLENECK:");
        System.out.println("  1. An unbuffered read() causes a context switch from User Mode to Kernel Mode per byte.");
        System.out.println("  2. Buffering fetches 8192 bytes in 1 single kernel syscall, serving subsequent reads from RAM.");

        System.out.println("\n==========================================================================");
    }
}