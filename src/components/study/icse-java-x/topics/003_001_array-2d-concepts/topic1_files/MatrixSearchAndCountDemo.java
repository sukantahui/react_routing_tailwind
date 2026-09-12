/**
 * Topic 1 - Example 4: Linear Search & Frequency Count in a 2D Matrix
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Searching for an element K in a 2D array
 * 2. Recording and printing all coordinate pairs (row, col) where K occurs
 * 3. Counting total frequency and displaying "Not Found" message if absent
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

import java.util.Scanner;

public class MatrixSearchAndCountDemo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("============================================================");
        System.out.println("  TOPIC 1 · EXAMPLE 4: 2D MATRIX SEARCH & FREQUENCY COUNT");
        System.out.println("============================================================");

        int[][] grid = {
            {15, 23, 42, 15},
            {88, 15, 60, 71},
            {42, 90, 15, 33}
        };

        int rows = grid.length;
        int cols = grid[0].length;

        // Display current matrix
        System.out.println("Current Matrix (" + rows + " x " + cols + "):");
        for (int i = 0; i < rows; i++) {
            System.out.print("   ");
            for (int j = 0; j < cols; j++) {
                System.out.print(grid[i][j] + "\t");
            }
            System.out.println();
        }
        System.out.println();

        // Target key to search
        int target = 15;
        System.out.println("Searching for target key: " + target);

        int count = 0;
        boolean found = false;

        System.out.println("\nSearch Findings:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == target) {
                    count++;
                    found = true;
                    System.out.println("   -> Match #" + count + " found at Row " + i + ", Column " + j + " (index [" + i + "][" + j + "])");
                }
            }
        }

        if (found) {
            System.out.println("\nResult: Element " + target + " was found " + count + " time(s) in the matrix.");
        } else {
            System.out.println("\nResult: Element " + target + " does NOT exist in the matrix.");
        }

        // Search for an absent key to demonstrate failure path
        int absentKey = 999;
        System.out.println("\nSearching for absent key: " + absentKey);
        boolean foundAbsent = false;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == absentKey) {
                    foundAbsent = true;
                    break;
                }
            }
            if (foundAbsent) break;
        }

        if (!foundAbsent) {
            System.out.println("Result: Key " + absentKey + " not found (Successfully confirmed absent).");
        }
        System.out.println("============================================================");
        sc.close();
    }
}
