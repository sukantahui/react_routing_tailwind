/**
 * Topic 4 - Example 4: Testing for Symmetric and Skew-Symmetric Matrices
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Symmetric matrix criterion: A == A^T (mat[i][j] == mat[j][i] for all i, j)
 * 2. Skew-Symmetric matrix criterion: mat[i][j] == -mat[j][i] and diagonal = 0
 * 3. Efficient verification with early termination on mismatch
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class SymmetricMatrixCheckDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 4 · EXAMPLE 4: SYMMETRIC & SKEW-SYMMETRIC TEST");
        System.out.println("============================================================");

        // Matrix 1: Symmetric Matrix
        int[][] symMatrix = {
            {1, 7, 3},
            {7, 4, -5},
            {3, -5, 6}
        };

        // Matrix 2: Non-Symmetric Matrix
        int[][] nonSymMatrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // 1. Testing First Matrix
        System.out.println("1. Testing Matrix 1:");
        printMatrix(symMatrix);
        boolean isSym1 = checkSymmetric(symMatrix);
        System.out.println("   Result: " + (isSym1 ? "Matrix IS Symmetric (A = A^T)" : "Matrix is NOT Symmetric"));
        System.out.println();

        // 2. Testing Second Matrix
        System.out.println("2. Testing Matrix 2:");
        printMatrix(nonSymMatrix);
        boolean isSym2 = checkSymmetric(nonSymMatrix);
        System.out.println("   Result: " + (isSym2 ? "Matrix IS Symmetric (A = A^T)" : "Matrix is NOT Symmetric"));
        System.out.println();

        // 3. Testing Skew-Symmetric Matrix
        int[][] skewMatrix = {
            { 0,  2, -5},
            {-2,  0,  4},
            { 5, -4,  0}
        };
        System.out.println("3. Testing Matrix 3 (Skew-Symmetric Candidate):");
        printMatrix(skewMatrix);
        boolean isSkew = checkSkewSymmetric(skewMatrix);
        System.out.println("   Result: " + (isSkew ? "Matrix IS Skew-Symmetric (A^T = -A)" : "Matrix is NOT Skew-Symmetric"));
        System.out.println("============================================================");
    }

    public static boolean checkSymmetric(int[][] mat) {
        int n = mat.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (mat[i][j] != mat[j][i]) {
                    return false; // Found asymmetry, terminate immediately
                }
            }
        }
        return true;
    }

    public static boolean checkSkewSymmetric(int[][] mat) {
        int n = mat.length;
        for (int i = 0; i < n; i++) {
            if (mat[i][i] != 0) return false; // Main diagonal elements MUST be zero
            for (int j = i + 1; j < n; j++) {
                if (mat[i][j] != -mat[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }

    private static void printMatrix(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print("   ");
            for (int j = 0; j < arr[i].length; j++) {
                System.out.printf("%4d", arr[i][j]);
            }
            System.out.println();
        }
    }
}
