/**
 * File: ArrayTraversalStandardAndReverseDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 8)
 * Description: Demonstrates standard forward and reverse array traversal mechanics in Java (JLS §14.14):
 *              forward indexing (0 to length-1), reverse indexing (length-1 down to 0), step-skipping loops,
 *              two-pointer in-place array reversal, and chronological fee auditing in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class ArrayTraversalStandardAndReverseDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 8 ARRAY STANDARD & REVERSE TRAVERSAL");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] feeRecords = {12000.0, 15000.0, 18000.0, 14000.0, 20000.0};
        String[] studentRoster = {"Swadeep", "Tuhina", "Abhronila", "Debangshu", "Pritam"};

        // 1. Standard Forward Traversal (0 to length - 1)
        System.out.println("--- 1. STANDARD FORWARD TRAVERSAL (CHRONOLOGICAL) ---");
        double totalFees = 0.0;
        for (int i = 0; i < feeRecords.length; i++) {
            totalFees += feeRecords[i];
            System.out.printf("  [%d] %-10s : ₹%,.2f%n", i, studentRoster[i], feeRecords[i]);
        }
        System.out.printf("  Total Batch Revenue: ₹%,.2f%n%n", totalFees);

        // 2. Reverse Traversal (length - 1 down to 0)
        System.out.println("--- 2. REVERSE TRAVERSAL (LATEST TO OLDEST) ---");
        for (int i = feeRecords.length - 1; i >= 0; i--) {
            System.out.printf("  [%d] %-10s : ₹%,.2f%n", i, studentRoster[i], feeRecords[i]);
        }
        System.out.println();

        // 3. Step-Skipping Traversal (Even vs Odd Indices)
        System.out.println("--- 3. STEP-SKIPPING TRAVERSAL (EVEN POSITIONS) ---");
        for (int i = 0; i < feeRecords.length; i += 2) {
            System.out.printf("  Even Seat [%d] %-10s : ₹%,.2f%n", i, studentRoster[i], feeRecords[i]);
        }
        System.out.println();

        // 4. Two-Pointer In-Place Array Reversal
        System.out.println("--- 4. TWO-POINTER IN-PLACE ARRAY REVERSAL ---");
        int[] scores = {85, 92, 78, 95, 88};
        System.out.println("  Original scores : " + Arrays.toString(scores));

        int left = 0, right = scores.length - 1;
        while (left < right) {
            int temp = scores[left];
            scores[left] = scores[right];
            scores[right] = temp;
            left++;
            right--;
        }
        System.out.println("  Reversed scores : " + Arrays.toString(scores) + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Forward loops iterate 0 to length - 1 using 'for (int i = 0; i < arr.length; i++)'.");
        System.out.println("2. Reverse loops iterate length - 1 down to 0 using 'for (int i = arr.length - 1; i >= 0; i--)'.");
        System.out.println("3. Index-based loops permit element mutation in-place (arr[i] *= 2).");
        System.out.println("4. Two-pointer convergence reverses arrays in O(N) time and O(1) auxiliary space.");
        System.out.println("================================================================================");
    }
}
