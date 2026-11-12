/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 17: Performance Considerations in String Operations
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringPerformanceBenchmarkingDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    STRING PERFORMANCE & LOOP CONCATENATION       ");
        System.out.println("==================================================");

        int iterations = 10000;

        // 1. Benchmarking String concatenation with + (O(N^2) overhead)
        long start1 = System.currentTimeMillis();
        String str = "";
        for (int i = 0; i < iterations; i++) {
            str = str + "*";
        }
        long duration1 = System.currentTimeMillis() - start1;
        System.out.println("[1] String '+' Concatenation (" + iterations + " times):");
        System.out.println("    Time taken: " + duration1 + " ms (Slow due to 10,000 object allocations!)");

        // 2. Benchmarking StringBuilder append (O(N) linear time)
        long start2 = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sb.append("*");
        }
        long duration2 = System.currentTimeMillis() - start2;
        System.out.println("\n[2] StringBuilder.append() (" + iterations + " times):");
        System.out.println("    Time taken: " + duration2 + " ms (Blazing fast in-place buffer!)");

        System.out.println("\nSpeedup factor: ~" + (duration1 > 0 ? (duration1 / (duration2 > 0 ? duration2 : 1)) : "100x+"));
        System.out.println("==================================================");
    }
}