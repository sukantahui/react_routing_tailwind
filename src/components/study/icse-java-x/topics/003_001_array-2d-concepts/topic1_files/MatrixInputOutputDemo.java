import java.util.Scanner;

public class MatrixInputOutputDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of rows (R): ");
        int rows = sc.nextInt();
        System.out.print("Enter number of columns (C): ");
        int cols = sc.nextInt();

        int[][] grid = new int[rows][cols];

        System.out.println("\nEnter " + (rows * cols) + " matrix elements:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print("Element [" + i + "][" + j + "]: ");
                grid[i][j] = sc.nextInt();
            }
        }

        System.out.println("\n--- Formatted Matrix Output ---");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(grid[i][j] + "\t");
            }
            System.out.println();
        }

        sc.close();
    }
}