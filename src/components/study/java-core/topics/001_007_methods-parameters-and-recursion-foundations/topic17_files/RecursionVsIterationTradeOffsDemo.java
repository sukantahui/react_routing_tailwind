/**
 * File: RecursionVsIterationTradeOffsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 17)
 * Description: Side-by-side empirical performance benchmark and architectural comparison of Recursion vs Iteration:
 *              1. Memory Overhead: O(N) Stack Frames vs O(1) Constant Stack Space
 *              2. Execution Time: Method invocation push/pop overhead vs CPU register loop branches
 *              3. Code Elegance vs Production Safety: When to choose Recursion vs Iteration
 *              for student tuition ledger summation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class RecursionVsIterationTradeOffsDemo {

    // =========================================================================
    // 1. FACTORIAL: RECURSIVE (O(N) Stack Frames) VS ITERATIVE (O(1) Stack Space)
    // =========================================================================
    public static long recursiveFactorial(int n) {
        if (n <= 1) return 1;
        return n * recursiveFactorial(n - 1);
    }

    public static long iterativeFactorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i; // Reuses single stack frame
        }
        return result;
    }

    // =========================================================================
    // 2. FIBONACCI: RECURSIVE (O(2^N)) VS ITERATIVE (O(N) Time, O(1) Space)
    // =========================================================================
    public static long naiveRecursiveFibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return naiveRecursiveFibonacci(n - 1) + naiveRecursiveFibonacci(n - 2);
    }

    public static long iterativeFibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        long a = 0;
        long b = 1;
        for (int i = 2; i <= n; i++) {
            long temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }

    // =========================================================================
    // 3. ARRAY FEE SUMMATION: RECURSIVE VS ITERATIVE
    // =========================================================================
    public static double recursiveFeeSum(double[] fees, int index) {
        if (index >= fees.length) return 0.0;
        return fees[index] + recursiveFeeSum(fees, index + 1);
    }

    public static double iterativeFeeSum(double[] fees) {
        double total = 0.0;
        for (double fee : fees) {
            total += fee; // O(1) stack memory
        }
        return total;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 17 RECURSION VS ITERATION SHOWDOWN");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- BENCHMARK 1: FACTORIAL (N = 20) ---
        int factN = 20;
        long t1 = System.nanoTime();
        long recFact = recursiveFactorial(factN);
        long t2 = System.nanoTime();

        long t3 = System.nanoTime();
        long iterFact = iterativeFactorial(factN);
        long t4 = System.nanoTime();

        System.out.printf("1. FACTORIAL (%d!):%n", factN);
        System.out.printf("   Recursive : %d [Time: %,d ns | Memory: O(N) Stack Frames]%n", recFact, (t2 - t1));
        System.out.printf("   Iterative : %d [Time: %,d ns | Memory: O(1) Stack Space]%n%n", iterFact, (t4 - t3));

        // --- BENCHMARK 2: FIBONACCI (N = 35) ---
        int fibN = 35;
        System.out.printf("2. FIBONACCI (N = %d):%n", fibN);

        long startIter = System.nanoTime();
        long iterFib = iterativeFibonacci(fibN);
        long endIter = System.nanoTime();
        System.out.printf("   Iterative : %,d [Time: %,d ns | Complexity: O(N) Time, O(1) Space]%n",
                iterFib, (endIter - startIter));

        long startRec = System.nanoTime();
        long recFib = naiveRecursiveFibonacci(fibN);
        long endRec = System.nanoTime();
        System.out.printf("   Recursive : %,d [Time: %,d ns | Complexity: O(2^N) Exponential!]%n%n",
                recFib, (endRec - startRec));

        // --- BENCHMARK 3: TUITION FEE ARRAY SUMMATION IN INDIAN RUPEES (₹) ---
        double[] tuitionLedger = {12000.0, 15000.0, 18000.0, 22000.0, 25000.0, 14000.0, 16000.0, 19000.0};
        System.out.println("3. BATCH TUITION SUMMATION (8 Campus Batches):");
        double recTotal = recursiveFeeSum(tuitionLedger, 0);
        double iterTotal = iterativeFeeSum(tuitionLedger);
        System.out.printf("   Recursive Fee Sum : ₹%,.2f%n", recTotal);
        System.out.printf("   Iterative Fee Sum : ₹%,.2f%n%n", iterTotal);

        System.out.println("================================================================================");
        System.out.println("DECISION MATRIX FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("• Use ITERATION for: Linear sequences, arrays, loops, deep counts (N > 5000).");
        System.out.println("• Use RECURSION for: Trees, Graphs, ASTs, Divide-and-Conquer, Backtracking puzzles.");
        System.out.println("================================================================================");
    }
}
