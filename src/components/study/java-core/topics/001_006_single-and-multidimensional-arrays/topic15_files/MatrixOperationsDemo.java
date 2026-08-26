/**
 * File: MatrixOperationsDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 15)
 * Description: Demonstrates core mathematical matrix operations on 2D arrays in Java:
 *              1. Matrix Addition (O(R x C) with dimension validation)
 *              2. Matrix Transpose (O(R x C) dimension inversion and in-place square transpose)
 *              3. Matrix Multiplication (O(R_A x C_A x C_B) with inner-dimension compatibility checks)
 *              for campus fee calculations in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class MatrixOperationsDemo {

    /**
     * 1. Matrix Addition: C[i][j] = A[i][j] + B[i][j].
     * Requires identical dimensions: A(R x C) and B(R x C).
     */
    public static double[][] addMatrices(double[][] a, double[][] b) {
        int rA = a.length, cA = a[0].length;
        int rB = b.length, cB = b[0].length;

        if (rA != rB || cA != cB) {
            throw new IllegalArgumentException("Matrix dimensions must match for addition!");
        }

        double[][] result = new double[rA][cA];
        for (int i = 0; i < rA; i++) {
            for (int j = 0; j < cA; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }

    /**
     * 2. Matrix Transpose: Swaps rows and columns.
     * If A is (R x C), Result is (C x R) where result[j][i] = a[i][j].
     */
    public static double[][] transposeMatrix(double[][] a) {
        int rows = a.length;
        int cols = a[0].length;
        double[][] transposed = new double[cols][rows];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                transposed[j][i] = a[i][j];
            }
        }
        return transposed;
    }

    /**
     * 3. Matrix Multiplication: C[i][j] = sum(A[i][k] * B[k][j]).
     * Compatibility: Columns of A (cA) MUST equal Rows of B (rB).
     */
    public static double[][] multiplyMatrices(double[][] a, double[][] b) {
        int rA = a.length, cA = a[0].length;
        int rB = b.length, cB = b[0].length;

        if (cA != rB) {
            throw new IllegalArgumentException(
                String.format("Incompatible dimensions for multiplication: A(%dx%d) and B(%dx%d)!", rA, cA, rB, cB)
            );
        }

        double[][] result = new double[rA][cB];
        for (int i = 0; i < rA; i++) {
            for (int j = 0; j < cB; j++) {
                double sum = 0.0;
                for (int k = 0; k < cA; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 15 MATRIX OPERATIONS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // Semester 1 & Semester 2 Campus Fees (2 Halls x 3 Seats)
        double[][] sem1Fees = {
            {12000.0, 15000.0, 18000.0}, // Barrackpore
            {11000.0, 14000.0, 16000.0}  // Naihati
        };

        double[][] sem2Fees = {
            {13000.0, 15500.0, 18500.0}, // Barrackpore
            {11500.0, 14500.0, 16500.0}  // Naihati
        };

        // 1. Matrix Addition Test
        System.out.println("--- 1. MATRIX ADDITION (SEM 1 + SEM 2) ---");
        double[][] totalAnnualFees = addMatrices(sem1Fees, sem2Fees);
        System.out.println("  Sem 1 Fees : " + Arrays.deepToString(sem1Fees));
        System.out.println("  Sem 2 Fees : " + Arrays.deepToString(sem2Fees));
        System.out.println("  Annual Sum : " + Arrays.deepToString(totalAnnualFees) + "\n");

        // 2. Matrix Transpose Test
        System.out.println("--- 2. MATRIX TRANSPOSE (2x3 -> 3x2) ---");
        double[][] transposed = transposeMatrix(sem1Fees);
        System.out.println("  Original (2x3)   : " + Arrays.deepToString(sem1Fees));
        System.out.println("  Transposed (3x2) : " + Arrays.deepToString(transposed) + "\n");

        // 3. Matrix Multiplication Test (2x3 multiplied by 3x2)
        System.out.println("--- 3. MATRIX MULTIPLICATION (2x3 * 3x2 -> 2x2) ---");
        double[][] weightMatrix = {
            {1.0, 0.5},
            {1.0, 0.5},
            {1.0, 0.5}
        };
        double[][] multiplied = multiplyMatrices(sem1Fees, weightMatrix);
        System.out.println("  Multiplied (2x2): " + Arrays.deepToString(multiplied) + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Matrix Addition requires identical dimensions: (R_A == R_B) && (C_A == C_B).");
        System.out.println("2. Matrix Transpose inverts dimensions: (R x C) becomes (C x R).");
        System.out.println("3. Matrix Multiplication requires columns of A == rows of B (C_A == R_B).");
        System.out.println("4. Matrix multiplication is O(R_A * C_A * C_B) using three nested loops.");
        System.out.println("================================================================================");
    }
}
