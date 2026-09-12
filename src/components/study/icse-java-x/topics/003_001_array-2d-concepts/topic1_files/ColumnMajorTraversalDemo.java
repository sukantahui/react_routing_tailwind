/**
 * Topic 1 - Example 2: Column-Major Matrix Traversal
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Column-by-Column traversal (Outer loop cols j, Inner loop rows i)
 * 2. Contrasting Row-Major vs Column-Major output order
 * 3. Processing matrices oriented by columns
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

import java.util.Scanner;

public class ColumnMajorTraversalDemo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("============================================================");
        System.out.println("  TOPIC 1 · EXAMPLE 2: COLUMN-MAJOR TRAVERSAL DEMO");
        System.out.println("============================================================");

        // Pre-populated 3x4 Matrix for clear visualization
        int[][] matrix = {
            {11, 12, 13, 14},
            {21, 22, 23, 24},
            {31, 32, 33, 34}
        };

        int rows = matrix.length;       // 3
        int cols = matrix[0].length;    // 4

        // 1. Standard Tabular Grid Output (Row-Major)
        System.out.println("1. Standard Grid Layout (Row-Major Order):");
        for (int i = 0; i < rows; i++) {
            System.out.print("   Row " + i + ":\t");
            for (int j = 0; j < cols; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }
        System.out.println();

        // 2. Column-Major Traversal: Outer loop j (0 to cols-1), Inner loop i (0 to rows-1)
        System.out.println("2. Traversing Column-by-Column (Column-Major Order):");
        for (int j = 0; j < cols; j++) {
            System.out.print("   Column " + j + " elements: ");
            for (int i = 0; i < rows; i++) {
                System.out.print(matrix[i][j] + "  ");
            }
            System.out.println();
        }
        System.out.println();

        // 3. Linear Sequence Comparison
        System.out.println("3. Linear Output Comparison:");
        System.out.print("   Row-Major Stream:    ");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(matrix[i][j] + " ");
            }
        }
        System.out.println();

        System.out.print("   Column-Major Stream: ");
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < rows; i++) {
                System.out.print(matrix[i][j] + " ");
            }
        }
        System.out.println("\n============================================================");
        sc.close();
    }
}
