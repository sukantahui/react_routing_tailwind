/**
 * File: ArrayMinMaxSecondHighestAverageDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 13)
 * Description: Demonstrates finding minimum, maximum, distinct second highest, sum, and average in an array
 *              in a single O(N) pass with O(1) space, handling edge cases (empty arrays, single elements, all duplicates),
 *              for student tuition ledger analytics in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class ArrayMinMaxSecondHighestAverageDemo {

    public static class ArrayStatistics {
        public final double min;
        public final double max;
        public final double secondMax;
        public final double sum;
        public final double average;

        public ArrayStatistics(double min, double max, double secondMax, double sum, double average) {
            this.min = min;
            this.max = max;
            this.secondMax = secondMax;
            this.sum = sum;
            this.average = average;
        }

        @Override
        public String toString() {
            return String.format(
                "  • Minimum Fee       : ₹%,.2f%n" +
                "  • Maximum Fee       : ₹%,.2f%n" +
                "  • 2nd Highest Fee   : %s%n" +
                "  • Total Sum         : ₹%,.2f%n" +
                "  • Arithmetic Average: ₹%,.2f",
                min, max,
                (Double.isInfinite(secondMax) ? "None (All duplicates or single item)" : String.format("₹%,.2f", secondMax)),
                sum, average
            );
        }
    }

    /**
     * Computes min, max, distinct second max, sum, and average in a single O(N) pass.
     */
    public static ArrayStatistics computeStatistics(double[] arr) {
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array cannot be null or empty!");
        }

        double min = arr[0];
        double max1 = Double.NEGATIVE_INFINITY;
        double max2 = Double.NEGATIVE_INFINITY;
        double sum = 0.0;

        for (double val : arr) {
            // Update min:
            if (val < min) min = val;

            // Update 1st and distinct 2nd max:
            if (val > max1) {
                max2 = max1;
                max1 = val;
            } else if (val > max2 && val != max1) {
                max2 = val;
            }

            // Accumulate sum:
            sum += val;
        }

        double avg = sum / arr.length;
        return new ArrayStatistics(min, max1, max2, sum, avg);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 13 ARRAY MIN, MAX, 2ND MAX & AVERAGE");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] batchFees = {18000.0, 12000.0, 25000.0, 14000.0, 25000.0, 15000.0};
        System.out.println("--- 1. BATCH FEE STATISTICS (SINGLE O(N) PASS) ---");
        System.out.println("  Input Array: " + Arrays.toString(batchFees));
        ArrayStatistics stats = computeStatistics(batchFees);
        System.out.println(stats);
        System.out.println();

        // 2. Edge Case: Array with all duplicates
        System.out.println("--- 2. EDGE CASE: ALL DUPLICATE VALUES ---");
        double[] duplicateArray = {15000.0, 15000.0, 15000.0};
        System.out.println("  Input Array: " + Arrays.toString(duplicateArray));
        ArrayStatistics dupStats = computeStatistics(duplicateArray);
        System.out.println(dupStats);
        System.out.println();

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Calculate min, max, 2nd max, and sum simultaneously in ONE O(N) pass.");
        System.out.println("2. Initialize max1 and max2 to Double.NEGATIVE_INFINITY for safe distinct comparison.");
        System.out.println("3. Always guard against empty arrays (arr.length == 0) to prevent division by zero.");
        System.out.println("4. Avoid sorting the array to find min/max (sorting takes O(N log N); linear scan is O(N)).");
        System.out.println("================================================================================");
    }
}
