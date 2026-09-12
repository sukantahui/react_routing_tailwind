/**
 * Topic 3 - Example 3: Diagonal 'X' Shape Display & Non-Diagonal Sum
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Printing only diagonal elements in an 'X' shape (blanks elsewhere)
 * 2. Summing elements that DO NOT lie on either diagonal
 * 3. Frequent ICSE Board exam question pattern
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class DiagonalDisplayAndNonDiagonalsDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 3 · EXAMPLE 3: 'X' PATTERN & NON-DIAGONAL SUM");
        System.out.println("============================================================");

        int[][] mat = {
            {5,  2,  8, 1},
            {9,  3,  6, 4},
            {7,  1,  4, 2},
            {8,  5,  3, 9}
        };

        int n = mat.length; // 4x4 matrix

        System.out.println("1. Original 4x4 Matrix:");
        for (int i = 0; i < n; i++) {
            System.out.print("   ");
            for (int j = 0; j < n; j++) {
                System.out.print(mat[i][j] + "\t");
            }
            System.out.println();
        }
        System.out.println();

        // 2. Printing in 'X' Pattern (Only Primary and Secondary Diagonals)
        System.out.println("2. 'X' Shape Display (Diagonal Elements Only):");
        for (int i = 0; i < n; i++) {
            System.out.print("   ");
            for (int j = 0; j < n; j++) {
                if (i == j || i + j == n - 1) {
                    System.out.print(mat[i][j] + "\t");
                } else {
                    System.out.print(" \t"); // Blank space for non-diagonal positions
                }
            }
            System.out.println();
        }
        System.out.println();

        // 3. Calculating Non-Diagonal (Off-Diagonal) Elements Sum
        int nonDiagonalSum = 0;
        int nonDiagonalCount = 0;

        System.out.print("3. Non-Diagonal Elements: ");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j && i + j != n - 1) {
                    System.out.print(mat[i][j] + " ");
                    nonDiagonalSum += mat[i][j];
                    nonDiagonalCount++;
                }
            }
        }
        System.out.println();
        System.out.println("   Non-Diagonal Count: " + nonDiagonalCount);
        System.out.println("   Non-Diagonal Sum:   " + nonDiagonalSum);
        System.out.println("============================================================");
    }
}
