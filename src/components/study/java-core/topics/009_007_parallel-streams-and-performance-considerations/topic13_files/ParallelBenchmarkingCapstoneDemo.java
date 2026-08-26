/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 13: Parallel Stream Benchmarking & Architectural Decision Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

public class ParallelBenchmarkingCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: PARALLEL STREAM BENCHMARKING CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int recordCount = 1_000_000;
        List<StudentExamRecord> examRecords = new ArrayList<>(recordCount);
        for (int i = 0; i < recordCount; i++) {
            examRecords.add(new StudentExamRecord(
                "Student_" + i, 
                i % 4 == 0 ? "Barrackpore" : (i % 4 == 1 ? "Naihati" : "Shyamnagar"), 
                ThreadLocalRandom.current().nextDouble(40.0, 100.0)
            ));
        }

        System.out.println(">>> 1. BENCHMARKING 1,000,000 EXAM ANALYSIS PIPELINES:");

        // Benchmark 1: Sequential Stream
        long startSeq = System.currentTimeMillis();
        double seqAvg = examRecords.stream()
            .filter(r -> "Barrackpore".equals(r.center()) && r.score() >= 75.0)
            .mapToDouble(StudentExamRecord::score)
            .average()
            .orElse(0.0);
        long seqTime = System.currentTimeMillis() - startSeq;
        System.out.println("   - Sequential Duration : " + seqTime + " ms (Average Score: " + String.format("%.2f", seqAvg) + "%)");

        // Benchmark 2: Parallel Stream
        long startPar = System.currentTimeMillis();
        double parAvg = examRecords.parallelStream()
            .filter(r -> "Barrackpore".equals(r.center()) && r.score() >= 75.0)
            .mapToDouble(StudentExamRecord::score)
            .average()
            .orElse(0.0);
        long parTime = System.currentTimeMillis() - startPar;
        System.out.println("   - Parallel Duration   : " + parTime + " ms (Average Score: " + String.format("%.2f", parAvg) + "%)");
        System.out.println("   --> Parallel Speedup  : " + String.format("%.2f", (double) seqTime / Math.max(parTime, 1)) + "x faster!");

        // Benchmark 3: Order Preservation Cost: forEach() vs forEachOrdered()
        System.out.println("\n>>> 2. ENCOUNTER ORDER SYNCHRONIZATION OVERHEAD:");
        List<Integer> sample = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        System.out.print("   - forEach() (Unordered, Max Concurrency): ");
        sample.parallelStream().forEach(n -> System.out.print(n + " "));
        System.out.println();

        System.out.print("   - forEachOrdered() (Enforces 1..8 order): ");
        sample.parallelStream().forEachOrdered(n -> System.out.print(n + " "));
        System.out.println();

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 009_007 COMPLETE: PARALLEL STREAMS & PERFORMANCE MASTERED!");
        System.out.println("==========================================================================");
    }

    record StudentExamRecord(String name, String center, double score) {}
}
