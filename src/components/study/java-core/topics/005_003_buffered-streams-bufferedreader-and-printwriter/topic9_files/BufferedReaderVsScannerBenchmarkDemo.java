/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 9: In-Depth Benchmark: BufferedReader vs Scanner (Performance & Throughput)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.Scanner;

public class BufferedReaderVsScannerBenchmarkDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: BufferedReader vs Scanner BENCHMARK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Generate 50,000 lines in memory:
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 50_000; i++) {
            sb.append("Trainee_").append(i).append(" Score_95 Barrackpore_Hub Active\n");
        }
        String bigDataPayload = sb.toString();

        // BENCHMARK 1: BufferedReader (Fast, synchronized 8KB buffer, no regex):
        long t1 = System.nanoTime();
        int brLines = 0;
        try (BufferedReader br = new BufferedReader(new StringReader(bigDataPayload))) {
            String line;
            while ((line = br.readLine()) != null) {
                brLines++;
            }
        }
        long brDuration = System.nanoTime() - t1;

        // BENCHMARK 2: Scanner (Heavy regex pattern matcher, 1KB default buffer):
        long t2 = System.nanoTime();
        int scLines = 0;
        try (Scanner sc = new Scanner(new StringReader(bigDataPayload))) {
            while (sc.hasNextLine()) {
                String line = sc.nextLine();
                scLines++;
            }
        }
        long scDuration = System.nanoTime() - t2;

        System.out.println(">>> 50,000 LINES BENCHMARK RESULTS:");
        System.out.printf("  - BufferedReader Duration : %7.2f ms (Processed %d lines)%n", brDuration / 1_000_000.0, brLines);
        System.out.printf("  - Scanner Duration        : %7.2f ms (Processed %d lines)%n", scDuration / 1_000_000.0, scLines);
        System.out.printf("  - BufferedReader Speedup  : ~%.1fx FASTER!%n", (double) scDuration / brDuration);

        System.out.println("\n>>> WHY BufferedReader IS DRAMATICALLY FASTER:");
        System.out.println("  1. Buffer Size: BufferedReader has an 8KB buffer (vs Scanner's 1KB buffer).");
        System.out.println("  2. Regex Engine: Scanner executes regular expression matches on every token check.");
        System.out.println("  3. Memory Footprint: Scanner allocates numerous Matcher and MatchResult objects.");

        System.out.println("\n==========================================================================");
    }
}