/**
 * Topic 3: Primary and Secondary Diagonal Elements
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

import java.util.Scanner;

public class MatrixDiagonalsDemo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  ICSE CLASS X: MATRIX DIAGONAL ELEMENTS DEMO");
        System.out.println("==================================================");

        // Diagonals exist only in square matrices (N x N)
        System.out.print("Enter size of square matrix (N): ");
        int n = sc.nextInt();

        if (n <= 0) {
            System.out.println("Error: Size must be a positive integer.");
            sc.close();
            return;
        }

        int[][] mat = new int[n][n];

        // Step 1: Input square matrix elements
        System.out.println("\nEnter " + (n * n) + " elements row by row:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("Element [" + i + "][" + j + "]: ");
                mat[i][j] = sc.nextInt();
            }
        }

        // Step 2: Display original matrix
        System.out.println("\n--- Entered Matrix (" + n + " x " + n + ") ---");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(mat[i][j] + "\t");
            }
            System.out.println();
        }

        // Step 3: Traverse and calculate Left (Primary) Diagonal (i == j)
        int primarySum = 0;
        System.out.print("\nLeft / Primary Diagonal elements: ");
        for (int i = 0; i < n; i++) {
            System.out.print(mat[i][i] + " ");
            primarySum += mat[i][i];
        }
        System.out.println("\nSum of Primary Diagonal = " + primarySum);

        // Step 4: Traverse and calculate Right (Secondary) Diagonal (i + j == n - 1)
        int secondarySum = 0;
        System.out.print("\nRight / Secondary Diagonal elements: ");
        for (int i = 0; i < n; i++) {
            int j = n - 1 - i;
            System.out.print(mat[i][j] + " ");
            secondarySum += mat[i][j];
        }
        System.out.println("\nSum of Secondary Diagonal = " + secondarySum);

        // Step 5: Combined Diagonal Sum (Handling intersection for odd N)
        int combinedSum = primarySum + secondarySum;
        if (n % 2 != 0) {
            int center = n / 2;
            combinedSum -= mat[center][center]; // Deduct duplicate central element
            System.out.println("\n(Odd N = " + n + ": Central element mat[" + center + "][" + center + "] = " 
                               + mat[center][center] + " counted once)");
        }
        System.out.println("Combined Diagonal Sum (without center duplication) = " + combinedSum);

        // Step 6: Display Diagonal Pattern (X-shape)
        System.out.println("\n--- Diagonal Matrix Visualization (X-Pattern) ---");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j || i + j == n - 1) {
                    System.out.print(mat[i][j] + "\t");
                } else {
                    System.out.print(" \t"); // Blank space for non-diagonal cells
                }
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
 * sc              Scanner     Object of Scanner class for reading input
 * n               int         Dimension size of the square matrix (N x N)
 * mat             int[][]     Stores 2D square matrix elements
 * i               int         Outer loop index for row traversal
 * j               int         Inner loop index / derived column index (n - 1 - i)
 * primarySum      int         Accumulates sum of Left/Principal diagonal elements
 * secondarySum    int         Accumulates sum of Right/Secondary diagonal elements
 * combinedSum     int         Stores combined diagonal sum without center double-counting
 * center          int         Stores coordinate index of the central intersection element
 * ============================================================================
 */