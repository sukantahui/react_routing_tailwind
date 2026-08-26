/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 7: When Parallel Streams Fail & Hurt Performance - The 5 Anti-Patterns
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Stream;

public class ParallelStreamAntiPatternsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: PARALLEL STREAM ANTI-PATTERNS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 5 MAJOR PARALLEL STREAM PERFORMANCE KILLERS:");
        System.out.println("  1. Poor Data Splitting (e.g. LinkedList, Stream.iterate)");
        System.out.println("  2. Object Boxing & Unboxing Overhead (Stream<Integer> vs IntStream)");
        System.out.println("  3. Blocking I/O & Thread Starvation in commonPool");
        System.out.println("  4. Small Dataset Overhead (Splitting cost > compute cost)");
        System.out.println("  5. Shared Mutable State & Lock Contention (AtomicLong, synchronized)\n");

        // Demonstration: Stream.iterate without bound splits TERRIBLY in parallel!
        System.out.println(">>> Anti-Pattern Demo: Stream.iterate() in parallel:");
        long startSeq = System.currentTimeMillis();
        long seqSum = Stream.iterate(1L, n -> n + 1).limit(1_000_000).reduce(0L, Long::sum);
        long seqTime = System.currentTimeMillis() - startSeq;

        long startPar = System.currentTimeMillis();
        long parSum = Stream.iterate(1L, n -> n + 1).parallel().limit(1_000_000).reduce(0L, Long::sum);
        long parTime = System.currentTimeMillis() - startPar;

        System.out.println("  - Stream.iterate SEQUENTIAL : " + seqTime + " ms");
        System.out.println("  - Stream.iterate PARALLEL   : " + parTime + " ms (DRAMATICALLY SLOWER due to sequential dependency!)");

        System.out.println("\n==========================================================================");
    }
}
