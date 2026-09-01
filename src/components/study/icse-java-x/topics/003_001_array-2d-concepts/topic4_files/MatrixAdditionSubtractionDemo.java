import java.util.Scanner;

public class MatrixAdditionSubtractionDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int rows = 2, cols = 3;

        int[][] a = new int[rows][cols];
        int[][] b = new int[rows][cols];
        int[][] sum = new int[rows][cols];

        System.out.println("Enter elements for Matrix A (2x3):");
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                a[i][j] = sc.nextInt();

        System.out.println("Enter elements for Matrix B (2x3):");
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                b[i][j] = sc.nextInt();

        // Addition logic
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                sum[i][j] = a[i][j] + b[i][j];
            }
        }

        System.out.println("\n--- Resultant Sum Matrix (A + B) ---");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(sum[i][j] + "\t");
            }
            System.out.println();
        }

        sc.close();
    }
}