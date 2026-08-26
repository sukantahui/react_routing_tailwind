/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 9: The Boxing Penalty - Stream<Integer> vs IntStream in Multi-Core Processing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class BoxingPenaltyParallelDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: THE BOXING PENALTY IN PARALLEL STREAMS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int size = 5_000_000;
        System.out.println(">>> BENCHMARKING 5,000,000 NUMERIC SUMMATIONS (PARALLEL):");

        // 1. Primitive IntStream (Zero boxing, dense contiguous memory)
        long start = System.currentTimeMillis();
        long primitiveSum = IntStream.rangeClosed(1, size)
            .parallel()
            .mapToLong(x -> x)
            .sum();
        long primitiveTime = System.currentTimeMillis() - start;
        System.out.println("1. IntStream.rangeClosed() Parallel Time : " + primitiveTime + " ms (Sum: " + primitiveSum + ")");

        // 2. Boxed Stream<Integer> (Millions of Heap Allocations & Pointer Dereferences)
        start = System.currentTimeMillis();
        long boxedSum = Stream.iterate(1, n -> n <= size, n -> n + 1)
            .parallel()
            .mapToLong(Integer::longValue)
            .sum();
        long boxedTime = System.currentTimeMillis() - start;
        System.out.println("2. Boxed Stream<Integer> Parallel Time   : " + boxedTime + " ms (Sum: " + boxedSum + ")");

        System.out.println("\n>>> LESSON:");
        System.out.println("  - Boxing introduces massive pointer-chasing and cache invalidation overhead across CPU cores!");
        System.out.println("==========================================================================");
    }
}
