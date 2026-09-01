import java.util.Scanner;

public class MatrixDiagonalsDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter square matrix size N: ");
        int n = sc.nextInt();
        int[][] mat = new int[n][n];

        System.out.println("Enter " + (n * n) + " elements:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                mat[i][j] = sc.nextInt();
            }
        }

        int primarySum = 0, secondarySum = 0;

        System.out.println("\nPrimary Diagonal (i == j):");
        for (int i = 0; i < n; i++) {
            System.out.print(mat[i][i] + " ");
            primarySum += mat[i][i];
        }

        System.out.println("\n\nSecondary Diagonal (i + j == N - 1):");
        for (int i = 0; i < n; i++) {
            System.out.print(mat[i][n - 1 - i] + " ");
            secondarySum += mat[i][n - 1 - i];
        }

        System.out.println("\n\nPrimary Diagonal Sum: " + primarySum);
        System.out.println("Secondary Diagonal Sum: " + secondarySum);

        sc.close();
    }
}