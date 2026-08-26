/**
 * File: MultiVarForLoopHeaderDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 3)
 * Description: Demonstrates multiple variable initializations and update expressions in 'for' loop headers (JLS §14.14.1),
 *              the comma operator rules in Java loop clauses, two-pointer convergence algorithms,
 *              in-place array reversing, converging scholarship allocation ledger balances in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

import java.util.Arrays;

public class MultiVarForLoopHeaderDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 3 MULTIPLE INITIALIZATIONS & UPDATES IN 'FOR'");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Two-Pointer Convergence Pattern (i counting up, j counting down)
        System.out.println("--- 1. TWO-POINTER CONVERGENCE (i++, j--) ---");
        for (int i = 1, j = 5; i <= j; i++, j--) {
            System.out.printf("  Pointer Pair: Start Candidate #%d | End Candidate #%d | Delta: %d%n",
                    i, j, (j - i));
        }

        // 2. In-Place Array Reversal Using Multi-Variable Header
        System.out.println("\n--- 2. IN-PLACE ARRAY REVERSAL VIA TWO POINTERS ---");
        String[] batchStudents = {"Swadeep", "Tuhina", "Abhronila", "Debangshu", "Sourav"};
        System.out.println("  Original Batch Order : " + Arrays.toString(batchStudents));

        // Two pointers converging from left (start=0) and right (end=len-1):
        for (int left = 0, right = batchStudents.length - 1; left < right; left++, right--) {
            String temp = batchStudents[left];
            batchStudents[left] = batchStudents[right];
            batchStudents[right] = temp;
        }
        System.out.println("  Reversed Batch Order : " + Arrays.toString(batchStudents));

        // 3. Multi-Variable Financial Ledger Reconciliation (₹)
        System.out.println("\n--- 3. FINANCIAL LEDGER RECONCILIATION ---");
        double morningTotal = 0.0;
        double eveningTotal = 0.0;

        for (int mBatch = 1, eBatch = 1; mBatch <= 3 && eBatch <= 3; mBatch++, eBatch++) {
            double mFee = mBatch * 5000.0;
            double eFee = eBatch * 6000.0;
            morningTotal += mFee;
            eveningTotal += eFee;
            System.out.printf("  Reconciliation Cycle #%d: Morning ₹%,.2f | Evening ₹%,.2f%n",
                    mBatch, mFee, eFee);
        }
        System.out.printf("-> Total Reconciled: Morning: ₹%,.2f | Evening: ₹%,.2f%n",
                morningTotal, eveningTotal);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Multiple variables in init MUST share the SAME data type (e.g. int i = 0, j = 10).");
        System.out.println("2. Multiple update expressions are separated by COMMAS (i++, j--).");
        System.out.println("3. The condition clause CANNOT use commas—it must be a single boolean expression (e.g. i < j && valid).");
        System.out.println("4. The two-pointer technique runs in O(N/2) time, ideal for reversing and palindrome checks.");
        System.out.println("================================================================================");
    }
}
