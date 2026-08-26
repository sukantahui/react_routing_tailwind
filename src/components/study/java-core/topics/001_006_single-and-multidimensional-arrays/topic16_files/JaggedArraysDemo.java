/**
 * File: JaggedArraysDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 16)
 * Description: Demonstrates Jagged / Ragged arrays in Java (JLS §10.1, §10.2):
 *              two-step dynamic row allocation (new int[3][]), direct literal ragged initialization,
 *              row-specific length bounds checking (matrix[r].length), memory efficiency vs rectangular matrices,
 *              and Pascal's triangle generation for campus batch capacities in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class JaggedArraysDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 16 JAGGED / RAGGED ARRAYS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Two-Step Dynamic Allocation of Jagged Array
        System.out.println("--- 1. TWO-STEP DYNAMIC ALLOCATION OF JAGGED ARRAY ---");
        int totalCampuses = 4;
        double[][] campusBatches = new double[totalCampuses][]; // Step 1: Outer array allocated

        // Step 2: Allocate inner 1D arrays with varying row capacities:
        campusBatches[0] = new double[3]; // Barrackpore (3 seats)
        campusBatches[1] = new double[2]; // Naihati (2 seats)
        campusBatches[2] = new double[4]; // Shyamnagar (4 seats)
        campusBatches[3] = new double[1]; // Ichapur (1 seat)

        // Populate sample fee records:
        campusBatches[0][0] = 12000.0; campusBatches[0][1] = 15000.0; campusBatches[0][2] = 18000.0;
        campusBatches[1][0] = 13000.0; campusBatches[1][1] = 16000.0;
        campusBatches[2][0] = 10000.0; campusBatches[2][1] = 12000.0; campusBatches[2][2] = 14000.0; campusBatches[2][3] = 16000.0;
        campusBatches[3][0] = 20000.0;

        String[] campusNames = {"Barrackpore", "Naihati", "Shyamnagar", "Ichapur"};

        // Safe Traversal using row-specific length (campusBatches[r].length):
        for (int r = 0; r < campusBatches.length; r++) {
            System.out.printf("  Campus %-12s (%d seats): ", campusNames[r], campusBatches[r].length);
            for (int c = 0; c < campusBatches[r].length; c++) {
                System.out.printf("₹%,.0f ", campusBatches[r][c]);
            }
            System.out.println();
        }
        System.out.println();

        // 2. Direct Literal Ragged Array Instantiation
        System.out.println("--- 2. DIRECT LITERAL RAGGED ARRAY ---");
        double[][] scholarshipGrades = {
            {5000.0, 6000.0},
            {4000.0, 4500.0, 5000.0, 5500.0},
            {7000.0}
        };

        System.out.println("  Literal Ragged Array: " + Arrays.deepToString(scholarshipGrades) + "\n");

        // 3. Pascal's Triangle as a Jagged Array
        System.out.println("--- 3. PASCAL'S TRIANGLE AS A JAGGED ARRAY ---");
        int levels = 5;
        int[][] pascal = new int[levels][];

        for (int i = 0; i < levels; i++) {
            pascal[i] = new int[i + 1]; // Row i has (i + 1) columns!
            pascal[i][0] = 1;
            pascal[i][i] = 1;
            for (int j = 1; j < i; j++) {
                pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
            }
            System.out.printf("  Level %d: %s%n", (i + 1), Arrays.toString(pascal[i]));
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Jagged arrays have rows with differing column counts (matrix[r].length).");
        System.out.println("2. Allocate in two steps: 'new Type[R][]' then 'matrix[r] = new Type[customSize]'.");
        System.out.println("3. Always loop columns using 'c < matrix[r].length' to prevent IndexOutOfBoundsException.");
        System.out.println("4. Saves significant memory over fixed rectangular matrices when data size varies per row.");
        System.out.println("================================================================================");
    }
}
