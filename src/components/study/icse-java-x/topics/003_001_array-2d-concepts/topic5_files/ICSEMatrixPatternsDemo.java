import java.util.Scanner;

public class ICSEMatrixPatternsDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter square matrix dimension N: ");
        int n = sc.nextInt();
        int[][] mat = new int[n][n];

        System.out.println("Enter elements for " + n + "x" + n + " matrix:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                mat[i][j] = sc.nextInt();
            }
        }

        System.out.println("\n--- ICSE Board Analysis: Boundary Elements ---");
        int boundarySum = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                // Check if element is on boundary (first/last row or column)
                if (i == 0 || i == n - 1 || j == 0 || j == n - 1) {
                    System.out.print(mat[i][j] + "\t");
                    boundarySum += mat[i][j];
                } else {
                    System.out.print("\t"); // Blank space for non-boundary
                }
            }
            System.out.println();
        }

        System.out.println("\nSum of Boundary Elements = " + boundarySum);
        sc.close();
    }
}