/**
 * File: LoopAccumulatorsAndProductsDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 9)
 * Description: Demonstrates loop counter manipulation, running sum accumulators (additive identity 0),
 *              running product accumulators (multiplicative identity 1), min/max tracking,
 *              and multi-semester tuition revenue aggregations in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class LoopAccumulatorsAndProductsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 9 ACCUMULATORS, SUMS & RUNNING PRODUCTS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] semesterTuitions = {12000.0, 15000.0, 14000.0, 18000.0, 16000.0};

        // 1. Additive Accumulator (Running Sum - Initialized to 0.0)
        System.out.println("--- 1. ADDITIVE ACCUMULATOR (RUNNING SUM) ---");
        double runningTuitionSum = 0.0; // Additive identity
        int honorsCount = 0;           // Event counter

        for (int i = 0; i < semesterTuitions.length; i++) {
            runningTuitionSum += semesterTuitions[i];
            if (semesterTuitions[i] >= 15000.0) {
                honorsCount++;
            }
            System.out.printf("  Semester #%d: Added ₹%,.2f | Running Total: ₹%,.2f%n",
                    (i + 1), semesterTuitions[i], runningTuitionSum);
        }
        System.out.printf("-> Total 5-Semester Tuition: ₹%,.2f | High-Tier Semesters: %d%n%n",
                runningTuitionSum, honorsCount);

        // 2. Multiplicative Accumulator (Running Product - Initialized to 1)
        System.out.println("--- 2. MULTIPLICATIVE ACCUMULATOR (FACTORIAL / COMPOUND GROWTH) ---");
        int n = 5;
        long factorial = 1; // Multiplicative identity: Must be 1, NEVER 0!

        for (int i = 1; i <= n; i++) {
            factorial *= i;
            System.out.printf("  Step %d: Cumulative Product = %d%n", i, factorial);
        }
        System.out.printf("-> %d! Factorial = %d%n%n", n, factorial);

        // 3. Min/Max Tracking Across Loop Iterations
        System.out.println("--- 3. MIN / MAX DYNAMIC TRACKING ---");
        double minFee = Double.MAX_VALUE;
        double maxFee = Double.MIN_VALUE;

        for (double fee : semesterTuitions) {
            if (fee < minFee) minFee = fee;
            if (fee > maxFee) maxFee = fee;
        }
        System.out.printf("-> Lowest Semester Fee: ₹%,.2f | Highest Semester Fee: ₹%,.2f%n",
                minFee, maxFee);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Running Sums MUST be initialized to 0 (Additive Identity).");
        System.out.println("2. Running Products (factorials, powers) MUST be initialized to 1 (Multiplicative Identity).");
        System.out.println("3. Event Counters increment on matching conditions (if (score >= 90) count++).");
        System.out.println("4. Min/Max tracking initializes with MAX_VALUE/MIN_VALUE or first element.");
        System.out.println("================================================================================");
    }
}
