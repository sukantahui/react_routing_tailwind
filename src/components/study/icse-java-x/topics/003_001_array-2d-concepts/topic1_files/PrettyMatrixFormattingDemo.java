/**
 * Topic 1 - Example 3: Professional Matrix Formatted Printing
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Formatted output using System.out.printf with width specifiers (%4d, %6s)
 * 2. Boxed ASCII frame border rendering around matrices
 * 3. Handling uneven multi-digit numbers and negative integers neatly
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class PrettyMatrixFormattingDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 1 · EXAMPLE 3: PRETTY MATRIX FORMATTING");
        System.out.println("============================================================");

        // Matrix containing positive, negative, and varying digit lengths
        int[][] data = {
            {5, -12, 1024, 0},
            {256, 3, -7, 88},
            {-999, 45, 12, 7}
        };

        int rows = data.length;
        int cols = data[0].length;

        // 1. Unformatted raw print showing why formatting is needed
        System.out.println("1. Problem with Unformatted Output (Misaligned Columns):");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(data[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();

        // 2. Formatted with printf specifier %6d
        System.out.println("2. Aligned with System.out.printf(\"%6d\", val):");
        System.out.print("       ");
        for (int j = 0; j < cols; j++) {
            System.out.printf(" Col %d", j);
        }
        System.out.println();

        for (int i = 0; i < rows; i++) {
            System.out.printf("Row %d: ", i);
            for (int j = 0; j < cols; j++) {
                System.out.printf("%6d", data[i][j]);
            }
            System.out.println();
        }
        System.out.println();

        // 3. Professional ASCII Box Matrix Output
        System.out.println("3. Boxed Grid Framing Output:");
        printHorizontalDivider(cols);
        for (int i = 0; i < rows; i++) {
            System.out.print("| ");
            for (int j = 0; j < cols; j++) {
                System.out.printf("%5d | ", data[i][j]);
            }
            System.out.println();
            printHorizontalDivider(cols);
        }
        System.out.println("============================================================");
    }

    private static void printHorizontalDivider(int cols) {
        System.out.print("+");
        for (int j = 0; j < cols; j++) {
            System.out.print("-------+");
        }
        System.out.println();
    }
}
