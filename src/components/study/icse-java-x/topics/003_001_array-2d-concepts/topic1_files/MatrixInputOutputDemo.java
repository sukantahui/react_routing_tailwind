/**
 * Topic 1: Matrix Input and Output using Nested Loops
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

import java.util.Scanner;

public class MatrixInputOutputDemo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  ICSE CLASS X: MATRIX INPUT & OUTPUT DEMO");
        System.out.println("==================================================");

        // Step 1: Input dimensions
        System.out.print("Enter number of rows (M): ");
        int m = sc.nextInt();
        System.out.print("Enter number of columns (N): ");
        int n = sc.nextInt();

        // Validate positive dimensions
        if (m <= 0 || n <= 0) {
            System.out.println("Error: Dimensions must be positive integers.");
            sc.close();
            return;
        }

        // Step 2: Declare and instantiate the 2D array
        int[][] matrix = new int[m][n];

        // Step 3: Input matrix elements using nested loops (Row-Major Order)
        System.out.println("\nEnter " + (m * n) + " elements row by row:");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("Enter element at [" + i + "][" + j + "]: ");
                matrix[i][j] = sc.nextInt();
            }
        }

        // Step 4: Display matrix in proper tabular grid format
        System.out.println("\n--- Displaying Matrix (" + m + " x " + n + ") ---");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // Using \t (tab space) for clean column alignment
                System.out.print(matrix[i][j] + "\t");
            }
            // Essential: Newline after every row completion
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
 * sc              Scanner     Object of Scanner class to accept user input
 * m               int         Stores the number of rows in the matrix
 * n               int         Stores the number of columns in the matrix
 * matrix          int[][]     Stores 2D array elements entered by user
 * i               int         Outer loop index for row traversal (0 to m - 1)
 * j               int         Inner loop index for column traversal (0 to n - 1)
 * ============================================================================
 */