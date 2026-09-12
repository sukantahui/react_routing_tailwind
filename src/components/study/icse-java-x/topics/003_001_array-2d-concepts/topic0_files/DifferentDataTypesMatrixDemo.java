/**
 * Topic 0 - Example 4: 2D Arrays with Non-Integer Data Types
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. char[][] 2D array for Tic-Tac-Toe / Game Boards
 * 2. double[][] 2D array for decimal coordinates / temperature logs
 * 3. String[][] 2D array for classroom seating charts / student tables
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class DifferentDataTypesMatrixDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 0 · EXAMPLE 4: 2D ARRAYS OF DIFFERENT DATA TYPES");
        System.out.println("============================================================");

        // 1. Character Matrix: Tic-Tac-Toe Game Board
        char[][] board = {
            {'X', 'O', 'X'},
            {'O', 'X', ' '},
            {'O', ' ', 'X'}
        };

        System.out.println("1. char[][] Matrix (Tic-Tac-Toe Game Board):");
        for (int i = 0; i < board.length; i++) {
            System.out.print("   ");
            for (int j = 0; j < board[i].length; j++) {
                System.out.print(" " + board[i][j] + " ");
                if (j < board[i].length - 1) System.out.print("|");
            }
            System.out.println();
            if (i < board.length - 1) {
                System.out.println("   ---+---+---");
            }
        }
        System.out.println();

        // 2. Double Matrix: Temperature Readings (3 Cities across 4 Days)
        double[][] temperatures = {
            {28.5, 29.2, 31.0, 30.4}, // Kolkata
            {22.0, 21.5, 23.8, 24.1}, // Darjeeling
            {34.6, 35.0, 36.2, 35.8}  // Asansol
        };
        String[] cities = {"Kolkata", "Darjeeling", "Asansol"};

        System.out.println("2. double[][] Matrix (Temperature Readings in Celsius):");
        System.out.println("   City         \tDay 1\tDay 2\tDay 3\tDay 4");
        for (int i = 0; i < temperatures.length; i++) {
            System.out.printf("   %-12s\t", cities[i]);
            for (int j = 0; j < temperatures[i].length; j++) {
                System.out.printf("%.1f°C\t", temperatures[i][j]);
            }
            System.out.println();
        }
        System.out.println();

        // 3. String Matrix: Classroom Seating Chart (Barrackpore Lab)
        String[][] seatingChart = {
            {"Debangshu", "Swadeep", "Priyanka"},
            {"Ananya", "Rohan", "Siddhartha"},
            {"Sneha", "Subhashree", "Arpan"}
        };

        System.out.println("3. String[][] Matrix (Student Lab Seating Plan):");
        for (int i = 0; i < seatingChart.length; i++) {
            System.out.print("   Row " + i + ": ");
            for (int j = 0; j < seatingChart[i].length; j++) {
                System.out.printf("[Col %d: %-10s] ", j, seatingChart[i][j]);
            }
            System.out.println();
        }
        System.out.println("============================================================");
    }
}
