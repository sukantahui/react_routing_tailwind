/**
 * ICSE Class X Computer Applications - Matrix Output Tracing Demo
 * Educator: Sukanta Hui, Coder & AccoTax, Barrackpore (+91 7003756860)
 */
public class MatrixOutputTracerDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE 2D Array Output Tracing Simulation ===");
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("Original 3x3 Matrix:");
        for (int i = 0; i < mat.length; i++) {
            for (int j = 0; j < mat[i].length; j++) {
                System.out.print(mat[i][j] + "\t");
            }
            System.out.println();
        }

        int leftDiagonalSum = 0;
        int rightDiagonalSum = 0;
        int n = mat.length;
        for (int i = 0; i < n; i++) {
            leftDiagonalSum += mat[i][i];
            rightDiagonalSum += mat[i][n - 1 - i];
        }

        System.out.println("\nPrimary Diagonal Sum: " + leftDiagonalSum);
        System.out.println("Secondary Diagonal Sum: " + rightDiagonalSum);
        System.out.println("Tracing completed successfully.");
    }
}