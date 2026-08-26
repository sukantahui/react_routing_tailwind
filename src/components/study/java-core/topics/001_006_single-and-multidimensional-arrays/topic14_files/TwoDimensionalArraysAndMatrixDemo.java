/**
 * File: TwoDimensionalArraysAndMatrixDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 14)
 * Description: Demonstrates declaration, instantiation, memory reference architecture, and grid traversal
 *              of two-dimensional (2D) arrays in Java (JLS §10.1, §10.2) for multi-hall examination seating
 *              and campus fee matrices in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class TwoDimensionalArraysAndMatrixDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 14 2D ARRAYS & MATRIX VISUALIZATION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Declaration & Instantiation (3 Halls x 4 Seats)
        System.out.println("--- 1. 2D ARRAY DECLARATION & INSTANTIATION ---");
        int rows = 3; // 3 Examination Halls (Barrackpore, Naihati, Shyamnagar)
        int cols = 4; // 4 Lab Workstations per hall
        double[][] labExamMatrix = new double[rows][cols];

        System.out.printf("  Declared 2D array: double[%d][%d]%n", rows, cols);
        System.out.printf("  • Total Rows (Halls)    : labExamMatrix.length    = %d%n", labExamMatrix.length);
        System.out.printf("  • Columns in Hall 0     : labExamMatrix[0].length = %d%n%n", labExamMatrix[0].length);

        // 2. Direct Literal Initialization & Grid Population
        System.out.println("--- 2. DIRECT 2D ARRAY LITERAL INITIALIZATION ---");
        double[][] campusFeeGrid = {
            {12000.0, 15000.0, 18000.0, 14000.0}, // Hall 1: Barrackpore Main
            {13000.0, 16000.0, 19000.0, 15000.0}, // Hall 2: Naihati Branch
            {11000.0, 14000.0, 17000.0, 13000.0}  // Hall 3: Shyamnagar Center
        };

        // 3. Matrix Row-Major Grid Visualization
        System.out.println("--- 3. MATRIX ROW-MAJOR GRID VISUALIZATION ---");
        String[] campusNames = {"Barrackpore", "Naihati", "Shyamnagar"};
        double totalCampusRevenue = 0.0;

        System.out.println("  +---------------+-----------+-----------+-----------+-----------+");
        System.out.println("  | Campus Hall   | Seat [0]  | Seat [1]  | Seat [2]  | Seat [3]  |");
        System.out.println("  +---------------+-----------+-----------+-----------+-----------+");

        for (int r = 0; r < campusFeeGrid.length; r++) {
            System.out.printf("  | %-13s | ", campusNames[r]);
            for (int c = 0; c < campusFeeGrid[r].length; c++) {
                double fee = campusFeeGrid[r][c];
                totalCampusRevenue += fee;
                System.out.printf("₹%,6.0f | ", fee);
            }
            System.out.println();
        }
        System.out.println("  +---------------+-----------+-----------+-----------+-----------+");
        System.out.printf("  Total Multi-Campus Revenue: ₹%,.2f%n%n", totalCampusRevenue);

        // 4. Arrays.deepToString() Utility
        System.out.println("--- 4. java.util.Arrays.deepToString() FORMATTING ---");
        System.out.println("  Formatted: " + Arrays.deepToString(campusFeeGrid) + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. In Java, 2D arrays are 'arrays of arrays' (heap reference pointers).");
        System.out.println("2. matrix.length is row count; matrix[r].length is column count of row r.");
        System.out.println("3. Always traverse matrices using nested loops: outer rows (r), inner cols (c).");
        System.out.println("4. Use Arrays.deepToString(matrix) to print multidimensional arrays cleanly.");
        System.out.println("================================================================================");
    }
}
