/**
 * Topic 5: Board Pattern Programs on Matrices
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

import java.util.Scanner;

public class ICSEMatrixPatternsDemo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  ICSE CLASS X: MATRIX BOARD PATTERNS DEMO");
        System.out.println("==================================================");

        System.out.print("Enter square matrix dimension (N): ");
        int n = sc.nextInt();

        if (n <= 0) {
            System.out.println("Error: Matrix dimension must be positive.");
            sc.close();
            return;
        }

        int[][] mat = new int[n][n];

        // Step 1: Input Matrix Elements
        System.out.println("\nEnter " + (n * n) + " elements row by row:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("Element [" + i + "][" + j + "]: ");
                mat[i][j] = sc.nextInt();
            }
        }

        // Step 2: Display Original Matrix
        System.out.println("\n--- 1. Original Matrix (" + n + " x " + n + ") ---");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(mat[i][j] + "\t");
            }
            System.out.println();
        }

        // Step 3: Board Pattern A - Boundary Elements & Sum
        System.out.println("\n--- 2. Boundary Elements Pattern ---");
        int boundarySum = 0;
        int nonBoundarySum = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                // Condition for boundary elements (outer ring)
                if (i == 0 || i == n - 1 || j == 0 || j == n - 1) {
                    System.out.print(mat[i][j] + "\t");
                    boundarySum += mat[i][j];
                } else {
                    System.out.print(" \t"); // Blank space for inner cells
                    nonBoundarySum += mat[i][j];
                }
            }
            System.out.println();
        }
        System.out.println("Sum of Boundary Elements = " + boundarySum);
        System.out.println("Sum of Non-Boundary (Inner) Elements = " + nonBoundarySum);

        // Step 4: Board Pattern B - Transpose of the Matrix (Rows become Columns)
        int[][] transpose = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                transpose[j][i] = mat[i][j]; // Swap row and column coordinates
            }
        }

        System.out.println("\n--- 3. Transpose of Matrix (B[j][i] = A[i][j]) ---");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(transpose[i][j] + "\t");
            }
            System.out.println();
        }

        // Step 5: Board Pattern C - Symmetric Matrix Check
        boolean isSymmetric = true;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] != mat[j][i]) {
                    isSymmetric = false;
                    break;
                }
            }
            if (!isSymmetric) break;
        }

        System.out.println("\n--- 4. Symmetric Matrix Test ---");
        if (isSymmetric) {
            System.out.println("Result: The matrix is SYMMETRIC (A[i][j] == A[j][i] for all cells).");
        } else {
            System.out.println("Result: The matrix is NOT symmetric.");
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
 * n               int         Dimension of the square matrix (N x N)
 * mat             int[][]     Stores original 2D square matrix
 * transpose       int[][]     Stores the transposed matrix
 * boundarySum     int         Accumulates the sum of boundary border elements
 * nonBoundarySum  int         Accumulates the sum of inner non-boundary elements
 * isSymmetric     boolean     Flag indicating whether the matrix is symmetric
 * i               int         Outer loop index for row traversal
 * j               int         Inner loop index for column traversal
 * ============================================================================
 */