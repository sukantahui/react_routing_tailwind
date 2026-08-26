/**
 * File: JavaUtilArraysMasterclassDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 19)
 * Description: Comprehensive Masterclass demonstration of the java.util.Arrays utility class:
 *              1. Formatting (Arrays.toString, Arrays.deepToString)
 *              2. Sorting (Arrays.sort, Arrays.parallelSort)
 *              3. Searching (Arrays.binarySearch)
 *              4. Population (Arrays.fill, Arrays.setAll)
 *              5. Equality & Comparison (Arrays.equals, Arrays.deepEquals, Arrays.compare, Arrays.mismatch)
 *              6. Stream / Collection Bridging (Arrays.stream, Arrays.asList)
 *              for student batch management in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;
import java.util.List;

public class JavaUtilArraysMasterclassDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 19 java.util.Arrays MASTERCLASS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Formatting & Printing (1D vs Multi-D)
        System.out.println("--- 1. ARRAYS FORMATTING UTILITIES ---");
        double[] fees1D = {18000.0, 12000.0, 15000.0, 14000.0};
        double[][] fees2D = {{12000.0, 15000.0}, {18000.0, 14000.0}};

        System.out.println("  1D toString()     : " + Arrays.toString(fees1D));
        System.out.println("  2D deepToString() : " + Arrays.deepToString(fees2D) + "\n");

        // 2. Bulk Population & Lambdas (fill & setAll)
        System.out.println("--- 2. BULK POPULATION (Arrays.fill & Arrays.setAll) ---");
        double[] bonusLedger = new double[4];
        Arrays.fill(bonusLedger, 2500.0); // Fills all with ₹2,500
        System.out.println("  Arrays.fill(₹2,500) : " + Arrays.toString(bonusLedger));

        int[] dynamicMultipliers = new int[5];
        // Index-based generation: (index + 1) * 1000:
        Arrays.setAll(dynamicMultipliers, i -> (i + 1) * 1000);
        System.out.println("  Arrays.setAll()     : " + Arrays.toString(dynamicMultipliers) + "\n");

        // 3. Sorting & Binary Search
        System.out.println("--- 3. SORTING & BINARY SEARCH ---");
        double[] examScores = {85.5, 92.0, 78.0, 95.5, 88.0};
        System.out.println("  Before sort : " + Arrays.toString(examScores));
        Arrays.sort(examScores); // Dual-Pivot Quicksort
        System.out.println("  After sort  : " + Arrays.toString(examScores));

        double targetScore = 92.0;
        int foundIdx = Arrays.binarySearch(examScores, targetScore);
        System.out.printf("  Arrays.binarySearch(%.1f) -> Found at index [%d]%n%n", targetScore, foundIdx);

        // 4. Equality & Modern Java 9+ Comparison (equals, deepEquals, compare, mismatch)
        System.out.println("--- 4. EQUALITY & COMPARISON (Java 9+ Utilities) ---");
        int[] batchA = {10, 20, 30, 40};
        int[] batchB = {10, 20, 30, 40};
        int[] batchC = {10, 20, 99, 40};

        System.out.println("  Arrays.equals(A, B)   : " + Arrays.equals(batchA, batchB)); // true
        System.out.println("  Arrays.compare(A, C)  : " + Arrays.compare(batchA, batchC)); // negative (30 < 99)
        System.out.println("  Arrays.mismatch(A, C) : " + Arrays.mismatch(batchA, batchC)); // index 2 (first mismatch)
        System.out.println();

        // 5. Bridging: Streams & Collections
        System.out.println("--- 5. STREAM & COLLECTION BRIDGING ---");
        List<String> studentList = Arrays.asList("Swadeep", "Tuhina", "Abhronila", "Debangshu");
        System.out.println("  Arrays.asList()   : " + studentList);

        double totalBatchFees = Arrays.stream(fees1D).sum();
        System.out.printf("  Arrays.stream().sum() : ₹%,.2f%n%n", totalBatchFees);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Arrays.toString() formats 1D; Arrays.deepToString() formats multidimensional matrices.");
        System.out.println("2. Arrays.sort() uses Dual-Pivot Quicksort for primitives and TimSort for objects.");
        System.out.println("3. Arrays.setAll() populates arrays dynamically using index generator lambdas.");
        System.out.println("4. Arrays.mismatch() identifies the first differing index in Java 9+.");
        System.out.println("================================================================================");
    }
}
