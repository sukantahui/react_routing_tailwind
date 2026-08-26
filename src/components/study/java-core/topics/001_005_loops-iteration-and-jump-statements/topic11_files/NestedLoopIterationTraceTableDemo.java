/**
 * File: NestedLoopIterationTraceTableDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 11)
 * Description: Demonstrates algorithmic dry running of nested loops using formal Iteration Trace Tables,
 *              tracking discrete clock states (i, i<=N, j, j<=i, printed output, accumulated sums),
 *              and student discount multiplier matrices in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class NestedLoopIterationTraceTableDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 11 DRY RUNNING WITH TRACE TABLES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int n = 3;

        // 1. Console Rendering of the Trace Table
        System.out.println("--- 1. FORMAL ITERATION TRACE TABLE (n = 3) ---");
        System.out.println("+------+-------+----------+-------+----------+--------------------+----------------+");
        System.out.println("| Step | Outer |  i <= 3  | Inner |  j <= i  |  Action / Value    | Printed Output |");
        System.out.println("+------+-------+----------+-------+----------+--------------------+----------------+");

        int step = 0;
        int accumulatedSum = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                step++;
                int termValue = i * j;
                accumulatedSum += termValue;
                System.out.printf("| %4d |  i=%d  | %-8b |  j=%d  | %-8b | Term: %d (Sum: %2d) | %-14s |%n",
                        step, i, (i <= n), j, (j <= i), termValue, accumulatedSum, (i + "*" + j + "=" + termValue));
            }
        }
        System.out.println("+------+-------+----------+-------+----------+--------------------+----------------+\n");

        // 2. Practical Pattern Produced by the Traced Loop
        System.out.println("--- 2. RESULTING 2D VISUAL OUTPUT ---");
        for (int i = 1; i <= n; i++) {
            System.out.print("  Row " + i + ": ");
            for (int j = 1; j <= i; j++) {
                System.out.printf("[₹%,d] ", (i * j * 1000));
            }
            System.out.println();
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Trace tables eliminate guesswork by recording discrete variable states per clock step.");
        System.out.println("2. Always record: Step #, Loop variables, Boolean test results, Mutations, and Outputs.");
        System.out.println("3. Indispensable for debugging pattern logic, two-pointer bounds, and dynamic programming.");
        System.out.println("================================================================================");
    }
}
