/**
 * File: LoopConceptDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 0)
 * Description: Demonstrates the fundamental concept of iteration in Java (Böhm-Jacopini Theorem),
 *              comparing manual code duplication (WET) vs automated loop iteration (DRY),
 *              the 4 essential phases of every loop (Init, Condition, Body, Update),
 *              and batch student tuition fee receipt generation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class LoopConceptDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 0 CONCEPT OF ITERATION & LOOPS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. The Anti-Pattern: Manual Code Duplication (WET - Write Everything Twice)
        System.out.println("--- 1. MANUAL DUPLICATION ANTI-PATTERN (WET) ---");
        System.out.println("Student #1: Tuition Installment Voucher Printed (₹5,000)");
        System.out.println("Student #2: Tuition Installment Voucher Printed (₹5,000)");
        System.out.println("Student #3: Tuition Installment Voucher Printed (₹5,000)");
        System.out.println("Student #4: Tuition Installment Voucher Printed (₹5,000)");
        System.out.println("Student #5: Tuition Installment Voucher Printed (₹5,000)");
        System.out.println("-> Notice: Hard to scale to 1,000 students across Barrackpore and Shyamnagar!\n");

        // 2. The Clean Solution: Automated Iteration (DRY - Don't Repeat Yourself)
        System.out.println("--- 2. AUTOMATED ITERATION (DRY PRINCIPLE) ---");
        double installmentAmount = 5000.0;
        double totalBatchCollection = 0.0;

        // The 4 Fundamental Loop Phases:
        // 1. Initialization (int studentId = 1)
        // 2. Loop Condition (studentId <= 5)
        // 3. Loop Body     (print receipt & accumulate total)
        // 4. Loop Update   (studentId++)
        for (int studentId = 1; studentId <= 5; studentId++) {
            System.out.printf("Student #%d: Tuition Installment Voucher Dispatched (₹%,.2f)%n",
                    studentId, installmentAmount);
            totalBatchCollection += installmentAmount;
        }

        System.out.printf("%n-> Total Batch Revenue Collected: ₹%,.2f%n%n", totalBatchCollection);

        // 3. Why Computers Excel at Iteration: Speed & Precision
        System.out.println("--- 3. BATCH TRANSACTION EMULATION (10,000 ACCOUNTS) ---");
        long startTime = System.nanoTime();
        long transactionSum = 0;
        int transactionCount = 10_000;

        for (int i = 1; i <= transactionCount; i++) {
            transactionSum += 500; // Simulating ₹500 lab maintenance fee per student
        }
        long durationNs = System.nanoTime() - startTime;

        System.out.printf("Processed %,d transactions in %,d ns (~%.3f ms)%n",
                transactionCount, durationNs, durationNs / 1_000_000.0);
        System.out.printf("Total Maintenance Funds Accumulated: ₹%,d%n", transactionSum);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Loops automate repetitive computation without code duplication (DRY).");
        System.out.println("2. Every loop requires 4 phases: Initialization, Condition, Body, and Update.");
        System.out.println("3. If the condition never becomes false, an Infinite Loop occurs.");
        System.out.println("4. Loops form the 3rd pillar of structured programming (Sequence, Selection, Iteration).");
        System.out.println("================================================================================");
    }
}
