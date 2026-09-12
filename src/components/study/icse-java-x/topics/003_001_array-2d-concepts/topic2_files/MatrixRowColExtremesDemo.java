/**
 * Topic 2 - Example 2: Row-wise and Column-wise Maxima & Minima
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Finding the maximum and minimum element in each row
 * 2. Finding the maximum and minimum element in each column
 * 3. Finding overall matrix max & min with coordinates (row, col)
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class MatrixRowColExtremesDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 2 · EXAMPLE 2: ROW & COLUMN MAXIMA AND MINIMA");
        System.out.println("============================================================");

        int[][] mat = {
            {28, 65, 12, 89},
            {45, 19, 73, 34},
            {92, 51, 38, 60}
        };

        int m = mat.length;
        int n = mat[0].length;

        // Display Matrix
        System.out.println("Matrix Grid (" + m + " x " + n + "):");
        for (int i = 0; i < m; i++) {
            System.out.print("   Row " + i + ":\t");
            for (int j = 0; j < n; j++) {
                System.out.print(mat[i][j] + "\t");
            }
            System.out.println();
        }
        System.out.println();

        // 1. Finding Row-wise Max and Min
        System.out.println("1. Row-wise Maximum and Minimum:");
        for (int i = 0; i < m; i++) {
            int rowMax = mat[i][0];
            int rowMin = mat[i][0];
            for (int j = 1; j < n; j++) {
                if (mat[i][j] > rowMax) rowMax = mat[i][j];
                if (mat[i][j] < rowMin) rowMin = mat[i][j];
            }
            System.out.println("   Row " + i + " -> Max: " + rowMax + ", Min: " + rowMin);
        }
        System.out.println();

        // 2. Finding Column-wise Max and Min
        System.out.println("2. Column-wise Maximum and Minimum:");
        for (int j = 0; j < n; j++) {
            int colMax = mat[0][j];
            int colMin = mat[0][j];
            for (int i = 1; i < m; i++) {
                if (mat[i][j] > colMax) colMax = mat[i][j];
                if (mat[i][j] < colMin) colMin = mat[i][j];
            }
            System.out.println("   Col " + j + " -> Max: " + colMax + ", Min: " + colMin);
        }
        System.out.println();

        // 3. Overall Matrix Max and Min with Exact Indices
        int overallMax = mat[0][0], maxR = 0, maxC = 0;
        int overallMin = mat[0][0], minR = 0, minC = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] > overallMax) {
                    overallMax = mat[i][j];
                    maxR = i;
                    maxC = j;
                }
                if (mat[i][j] < overallMin) {
                    overallMin = mat[i][j];
                    minR = i;
                    minC = j;
                }
            }
        }

        System.out.println("3. Overall Matrix Extremes:");
        System.out.println("   Overall Maximum = " + overallMax + " located at [" + maxR + "][" + maxC + "]");
        System.out.println("   Overall Minimum = " + overallMin + " located at [" + minR + "][" + minC + "]");
        System.out.println("============================================================");
    }
}
