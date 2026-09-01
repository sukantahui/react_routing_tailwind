import java.util.Scanner;

public class MatrixRowColSumDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int rows = 3, cols = 3;
        int[][] matrix = new int[rows][cols];

        System.out.println("Enter 9 elements for 3x3 Matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }

        // Row sums
        System.out.println("\n--- Row Sums ---");
        for (int i = 0; i < rows; i++) {
            int rowSum = 0;
            for (int j = 0; j < cols; j++) {
                rowSum += matrix[i][j];
            }
            System.out.println("Sum of Row " + i + " = " + rowSum);
        }

        // Column sums
        System.out.println("\n--- Column Sums ---");
        for (int j = 0; j < cols; j++) {
            int colSum = 0;
            for (int i = 0; i < rows; i++) {
                colSum += matrix[i][j];
            }
            System.out.println("Sum of Column " + j + " = " + colSum);
        }

        sc.close();
    }
}