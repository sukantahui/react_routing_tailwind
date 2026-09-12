/**
 * Topic 4 - Example 3: Matrix Transposition (Rectangular & Square In-Place)
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Transposing rectangular matrix M x N into transposed matrix N x M:
 *    transposed[j][i] = original[i][j]
 * 2. In-place transpose for N x N square matrix (swapping upper and lower triangles)
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class MatrixTransposeDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 4 · EXAMPLE 3: MATRIX TRANSPOSE (M x N & IN-PLACE)");
        System.out.println("============================================================");

        // 1. Rectangular Matrix Transpose (2 rows x 4 columns -> 4 rows x 2 columns)
        int[][] rect = {
            {10, 20, 30, 40},
            {50, 60, 70, 80}
        };

        int r = rect.length;     // 2
        int c = rect[0].length;  // 4

        System.out.println("1. Original Rectangular Matrix (2 x 4):");
        printMatrix(rect);

        int[][] transposed = new int[c][r]; // Dimensions flipped: 4 rows x 2 columns
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                transposed[j][i] = rect[i][j];
            }
        }

        System.out.println("Transposed Matrix (4 x 2):");
        printMatrix(transposed);

        // 2. Square Matrix In-Place Transpose (3x3)
        int[][] sq = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int n = sq.length;

        System.out.println("2. Square Matrix (3x3) BEFORE In-Place Transpose:");
        printMatrix(sq);

        // Only swap for j > i to avoid swapping twice and leaving it unchanged!
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = sq[i][j];
                sq[i][j] = sq[j][i];
                sq[j][i] = temp;
            }
        }

        System.out.println("Square Matrix (3x3) AFTER In-Place Transpose:");
        printMatrix(sq);
        System.out.println("============================================================");
    }

    private static void printMatrix(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print("   ");
            for (int j = 0; j < arr[i].length; j++) {
                System.out.printf("%4d", arr[i][j]);
            }
            System.out.println();
        }
        System.out.println();
    }
}
