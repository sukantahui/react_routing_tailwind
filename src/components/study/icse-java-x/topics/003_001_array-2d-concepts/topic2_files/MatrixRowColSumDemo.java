/**
 * Topic 2: Row Sum and Column Sum Calculation
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

import java.util.Scanner;

public class MatrixRowColSumDemo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  ICSE CLASS X: MATRIX ROW & COLUMN SUM DEMO");
        System.out.println("==================================================");

        System.out.print("Enter number of rows (M): ");
        int m = sc.nextInt();
        System.out.print("Enter number of columns (N): ");
        int n = sc.nextInt();

        int[][] matrix = new int[m][n];

        // Step 1: Input matrix elements
        System.out.println("\nEnter " + (m * n) + " elements row by row:");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("Element [" + i + "][" + j + "]: ");
                matrix[i][j] = sc.nextInt();
            }
        }

        // Step 2: Display original matrix
        System.out.println("\n--- Entered Matrix (" + m + " x " + n + ") ---");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }

        // Step 3: Compute and Display Row Sums
        System.out.println("\n--- Row-wise Sums ---");
        int grandTotal = 0;
        for (int i = 0; i < m; i++) {
            int rowSum = 0; // Reset row sum accumulator for each new row
            for (int j = 0; j < n; j++) {
                rowSum += matrix[i][j];
            }
            grandTotal += rowSum;
            System.out.println("Sum of Row " + i + " = " + rowSum);
        }

        // Step 4: Compute and Display Column Sums
        System.out.println("\n--- Column-wise Sums ---");
        for (int j = 0; j < n; j++) {
            int colSum = 0; // Reset column sum accumulator for each new column
            for (int i = 0; i < m; i++) {
                colSum += matrix[i][j];
            }
            System.out.println("Sum of Column " + j + " = " + colSum);
        }

        // Step 5: Display Grand Total
        System.out.println("\nGrand Total of all elements = " + grandTotal);
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
 * sc              Scanner     Object of Scanner class to accept input
 * m               int         Stores the number of rows in the matrix
 * n               int         Stores the number of columns in the matrix
 * matrix          int[][]     Stores 2D array elements
 * i               int         Outer loop index for row traversal
 * j               int         Inner loop index for column traversal
 * rowSum          int         Accumulates the sum of elements of the current row
 * colSum          int         Accumulates the sum of elements of the current column
 * grandTotal      int         Accumulates the total sum of all matrix elements
 * ============================================================================
 */