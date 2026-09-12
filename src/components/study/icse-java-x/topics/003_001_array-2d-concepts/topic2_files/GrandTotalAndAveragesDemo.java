/**
 * Topic 2 - Example 4: Matrix Grand Total, Averages & Deviation
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Accumulating all elements to find Matrix Grand Total & Overall Mean
 * 2. Calculating per-row averages
 * 3. Counting elements strictly greater than and less than the overall mean
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class GrandTotalAndAveragesDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 2 · EXAMPLE 4: GRAND TOTAL, AVERAGES & STATS");
        System.out.println("============================================================");

        int[][] grid = {
            {20, 45, 30},
            {15, 60, 25},
            {50, 10, 35}
        };

        int rows = grid.length;
        int cols = grid[0].length;
        int totalCells = rows * cols;

        int grandTotal = 0;

        // 1. Grid display and Grand Sum calculation
        System.out.println("Matrix Table (" + rows + " x " + cols + "):");
        for (int i = 0; i < rows; i++) {
            System.out.print("   Row " + i + ":\t");
            int rowSum = 0;
            for (int j = 0; j < cols; j++) {
                System.out.print(grid[i][j] + "\t");
                rowSum += grid[i][j];
                grandTotal += grid[i][j];
            }
            double rowAvg = (double) rowSum / cols;
            System.out.printf("[Sum: %d | Avg: %.2f]\n", rowSum, rowAvg);
        }
        System.out.println();

        double overallMean = (double) grandTotal / totalCells;

        System.out.println("Summary Statistics:");
        System.out.println("   Total Cells:   " + totalCells);
        System.out.println("   Grand Total:   " + grandTotal);
        System.out.printf("   Overall Mean:  %.2f\n", overallMean);
        System.out.println();

        // 2. Classifying elements above and below mean
        int aboveCount = 0;
        int belowCount = 0;
        int equalCount = 0;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] > overallMean) aboveCount++;
                else if (grid[i][j] < overallMean) belowCount++;
                else equalCount++;
            }
        }

        System.out.println("Distribution relative to Mean (" + String.format("%.2f", overallMean) + "):");
        System.out.println("   Elements > Mean: " + aboveCount);
        System.out.println("   Elements < Mean: " + belowCount);
        System.out.println("   Elements = Mean: " + equalCount);
        System.out.println("============================================================");
    }
}
