/**
 * Topic 4 - Example 2: Scalar Multiplication & Linear Combinations
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Multiplying an M x N matrix by an integer scalar k: C[i][j] = k * A[i][j]
 * 2. Evaluating a linear matrix combination: Result = 2*A - 3*B
 * 3. In-place modification vs creating a new resultant matrix
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class ScalarMultiplicationDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 4 · EXAMPLE 2: SCALAR MULTIPLICATION OF MATRICES");
        System.out.println("============================================================");

        int[][] a = {
            {3, 7, 2},
            {5, 1, 9}
        };

        int[][] b = {
            {1, 4, 0},
            {2, 3, 5}
        };

        int m = a.length;
        int n = a[0].length;

        System.out.println("Matrix A (2x3):");
        printMatrix(a);

        System.out.println("Matrix B (2x3):");
        printMatrix(b);

        // 1. Scalar multiplication: C = 3 * A
        int scalarK = 3;
        int[][] scaledA = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                scaledA[i][j] = scalarK * a[i][j];
            }
        }
        System.out.println("1. Scaled Matrix (3 * A):");
        printMatrix(scaledA);

        // 2. Linear Combination: Result = 2*A - 3*B
        int[][] combination = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                combination[i][j] = (2 * a[i][j]) - (3 * b[i][j]);
            }
        }
        System.out.println("2. Linear Combination (2*A - 3*B):");
        printMatrix(combination);

        System.out.println("============================================================");
    }

    private static void printMatrix(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print("   ");
            for (int j = 0; j < arr[i].length; j++) {
                System.out.printf("%5d", arr[i][j]);
            }
            System.out.println();
        }
        System.out.println();
    }
}
