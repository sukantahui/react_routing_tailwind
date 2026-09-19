/**
 * File: MatrixSpiralAndRotationAlgorithmsDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 3)
 * Description: Implements and demonstrates classic 2D Matrix Manipulation Algorithms in Java:
 *              1. Spiral Order Traversal: 4-boundary pointer iteration (top, bottom, left, right)
 *              2. In-Place 90-Degree Clockwise Rotation: Transpose + Row Reversal (O(1) Auxiliary Space)
 *              3. Rectangular & Square matrix boundary validations
 *              for campus seating allocations & multi-batch score grids at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

public class MatrixSpiralAndRotationAlgorithmsDemo {

    // =========================================================================
    // 1. SPIRAL MATRIX TRAVERSAL: O(R * C) Time, O(1) Auxiliary Space
    // =========================================================================
    public static int[] spiralOrderTraversal(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return new int[0];
        }

        int rows = matrix.length;
        int cols = matrix[0].length;
        int[] result = new int[rows * cols];
        int index = 0;

        int top = 0;
        int bottom = rows - 1;
        int left = 0;
        int right = cols - 1;

        while (top <= bottom && left <= right) {
            // Traverse from Left to Right along top boundary
            for (int col = left; col <= right; col++) {
                result[index++] = matrix[top][col];
            }
            top++; // Shrink top boundary

            // Traverse from Top to Bottom along right boundary
            for (int row = top; row <= bottom; row++) {
                result[index++] = matrix[row][right];
            }
            right--; // Shrink right boundary

            // Traverse from Right to Left along bottom boundary (if rows remain)
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    result[index++] = matrix[bottom][col];
                }
                bottom--; // Shrink bottom boundary
            }

            // Traverse from Bottom to Top along left boundary (if columns remain)
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    result[index++] = matrix[row][left];
                }
                left++; // Shrink left boundary
            }
        }
        return result;
    }

    // =========================================================================
    // 2. IN-PLACE 90-DEGREE CLOCKWISE ROTATION: O(N^2) Time, O(1) Space
    // =========================================================================
    public static void rotateMatrix90ClockwiseInPlace(int[][] matrix) {
        if (matrix == null || matrix.length == 0) return;
        int n = matrix.length;

        // Step 1: Transpose Matrix (Swap matrix[i][j] with matrix[j][i] across main diagonal)
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // Step 2: Reverse each Row horizontally (Two-Pointer Swap)
        for (int i = 0; i < n; i++) {
            int left = 0;
            int right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }

    // Helper: Pretty-print a 1D primitive array using basic loops
    public static void print1DArray(String title, int[] arr) {
        System.out.println("  " + title + ":");
        System.out.print("  [");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]\n");
    }

    // Helper: Pretty-print a 2D matrix
    public static void printMatrixGrid(String title, int[][] matrix) {
        System.out.println("  " + title + ":");
        for (int[] row : matrix) {
            System.out.print("    [ ");
            for (int val : row) {
                System.out.printf("%3d ", val);
            }
            System.out.println("]");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 3 MATRIX SPIRAL & 90-DEG ROTATION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- 1. SPIRAL ORDER TRAVERSAL (3 x 4 Rectangular Matrix) ---
        int[][] campusSeating = {
            { 1,  2,  3,  4},
            { 5,  6,  7,  8},
            { 9, 10, 11, 12}
        };

        printMatrixGrid("Original 3x4 Seating Grid", campusSeating);
        int[] spiralResult = spiralOrderTraversal(campusSeating);
        print1DArray("Spiral Clockwise Traversal Order", spiralResult);

        // --- 2. IN-PLACE 90-DEGREE ROTATION (4 x 4 Square Matrix) ---
        int[][] squareScores = {
            {10, 20, 30, 40},
            {50, 60, 70, 80},
            {15, 25, 35, 45},
            {55, 65, 75, 85}
        };

        printMatrixGrid("Original 4x4 Square Grid Before Rotation", squareScores);
        rotateMatrix90ClockwiseInPlace(squareScores);
        printMatrixGrid("Rotated 4x4 Grid After 90° Clockwise In-Place Rotation", squareScores);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Spiral traversal manages 4 dynamic boundaries: top, bottom, left, right.");
        System.out.println("2. Always guard bottom and left traversals with 'if (top <= bottom)' & 'if (left <= right)'.");
        System.out.println("3. 90° Clockwise Rotation = Transpose across diagonal + Reverse each row horizontally.");
        System.out.println("4. In-place rotation uses O(1) auxiliary memory without allocating a second matrix.");
        System.out.println("5. Implemented purely with primitive arrays (int[] and int[][]) and loops - no Collections needed!");
        System.out.println("================================================================================");
    }
}
