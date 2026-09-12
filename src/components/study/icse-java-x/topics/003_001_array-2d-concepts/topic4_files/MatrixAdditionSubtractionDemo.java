/**
 * Topic 4: Matrix Addition and Subtraction
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

import java.util.Scanner;

public class MatrixAdditionSubtractionDemo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  ICSE CLASS X: MATRIX ADDITION & SUBTRACTION");
        System.out.println("==================================================");

        // Input dimensions
        System.out.print("Enter number of rows (M): ");
        int m = sc.nextInt();
        System.out.print("Enter number of columns (N): ");
        int n = sc.nextInt();

        if (m <= 0 || n <= 0) {
            System.out.println("Error: Dimensions must be positive integers.");
            sc.close();
            return;
        }

        // Both matrices MUST have identical dimensions M x N for addition/subtraction
        int[][] a = new int[m][n];
        int[][] b = new int[m][n];
        int[][] sum = new int[m][n];
        int[][] diff = new int[m][n];

        // Step 1: Input elements for Matrix A
        System.out.println("\nEnter " + (m * n) + " elements for Matrix A:");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("A[" + i + "][" + j + "]: ");
                a[i][j] = sc.nextInt();
            }
        }

        // Step 2: Input elements for Matrix B
        System.out.println("\nEnter " + (m * n) + " elements for Matrix B:");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("B[" + i + "][" + j + "]: ");
                b[i][j] = sc.nextInt();
            }
        }

        // Step 3: Compute Matrix Addition (A + B) and Subtraction (A - B)
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                sum[i][j] = a[i][j] + b[i][j];   // Element-wise sum
                diff[i][j] = a[i][j] - b[i][j];  // Element-wise difference
            }
        }

        // Step 4: Display Resultant Sum Matrix
        System.out.println("\n--- Resultant Sum Matrix (A + B) ---");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(sum[i][j] + "\t");
            }
            System.out.println();
        }

        // Step 5: Display Resultant Difference Matrix
        System.out.println("\n--- Resultant Difference Matrix (A - B) ---");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(diff[i][j] + "\t");
            }
            System.out.println();
        }

        System.out.println("==================================================");
        sc.close();
    }
}

/*
 * ============================================================================
 * VARIABLE DESCRIPTION TABLE (ICSE BOARD STANDARD DOCUMENTATION)
 * ============================================================================
 * Variable Name   Data Type   Purpose
 * ----------------------------------------------------------------------------
 * sc              Scanner     Object of Scanner class for user input
 * m               int         Stores the number of rows in both matrices
 * n               int         Stores the number of columns in both matrices
 * a               int[][]     First 2D input matrix
 * b               int[][]     Second 2D input matrix
 * sum             int[][]     Stores element-wise sum of A and B
 * diff            int[][]     Stores element-wise difference of A and B
 * i               int         Outer loop index for row traversal
 * j               int         Inner loop index for column traversal
 * ============================================================================
 */