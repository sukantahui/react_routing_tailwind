/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 6: When Parallel Streams Excel - Optimal Performance Criteria
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class WhenParallelStreamsExcelDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: WHEN PARALLEL STREAMS EXCEL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        int dataSize = 2_000_000;
        List<Double> transactionAmounts = new ArrayList<>(dataSize);
        for (int i = 0; i < dataSize; i++) {
            transactionAmounts.add(ThreadLocalRandom.current().nextDouble(100.0, 50_000.0));
        }

        System.out.println(">>> BENCHMARKING 2,000,000 TAX CALCULATIONS (ArrayList source):");

        // 1. Sequential Calculation
        long startSeq = System.currentTimeMillis();
        double seqTotalTax = transactionAmounts.stream()
            .mapToDouble(amt -> calculateGstTax(amt))
            .sum();
        long seqDuration = System.currentTimeMillis() - startSeq;
        System.out.println("  1. Sequential Duration: " + seqDuration + " ms (Total: ₹" + String.format("%.2f", seqTotalTax) + ")");

        // 2. Parallel Calculation
        long startPar = System.currentTimeMillis();
        double parTotalTax = transactionAmounts.parallelStream()
            .mapToDouble(amt -> calculateGstTax(amt))
            .sum();
        long parDuration = System.currentTimeMillis() - startPar;
        System.out.println("  2. Parallel Duration  : " + parDuration + " ms (Total: ₹" + String.format("%.2f", parTotalTax) + ")");

        double speedup = (double) seqDuration / Math.max(parDuration, 1);
        System.out.println("  --> Multi-Core Speedup Factor: " + String.format("%.2f", speedup) + "x faster!");

        System.out.println("\n==========================================================================");
    }

    static double calculateGstTax(double amount) {
        // Simulating moderate CPU-bound financial calculations
        double tax = amount * 0.18;
        for (int i = 0; i < 50; i++) {
            tax = Math.sqrt(tax * tax + 1.0);
        }
        return tax;
    }
}
