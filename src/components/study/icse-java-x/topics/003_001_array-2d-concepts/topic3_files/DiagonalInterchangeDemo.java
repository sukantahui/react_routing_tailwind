/**
 * Topic 3 - Example 4: Interchanging Primary and Secondary Diagonals
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Swapping elements of the Left (Primary) and Right (Secondary) diagonals
 * 2. In-place matrix modification using single loop:
 *    temp = mat[i][i];
 *    mat[i][i] = mat[i][n - 1 - i];
 *    mat[i][n - 1 - i] = temp;
 * 3. Popular ICSE Board practical problem
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class DiagonalInterchangeDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 3 · EXAMPLE 4: INTERCHANGE LEFT & RIGHT DIAGONALS");
        System.out.println("============================================================");

        int[][] mat = {
            {10, 20, 30, 40},
            {50, 60, 70, 80},
            {15, 25, 35, 45},
            {55, 65, 75, 85}
        };

        int n = mat.length; // 4x4 matrix

        // 1. Display matrix before swap
        System.out.println("1. Matrix BEFORE Diagonal Swap:");
        printMatrix(mat);

        // 2. Perform diagonal interchange using single loop
        System.out.println("2. Performing Swap Steps:");
        for (int i = 0; i < n; i++) {
            int leftCol = i;
            int rightCol = n - 1 - i;

            int temp = mat[i][leftCol];
            mat[i][leftCol] = mat[i][rightCol];
            mat[i][rightCol] = temp;

            System.out.println("   Row " + i + ": Swapped mat[" + i + "][" + leftCol + "] with mat[" + i + "][" + rightCol + "]");
        }
        System.out.println();

        // 3. Display matrix after swap
        System.out.println("3. Matrix AFTER Diagonal Swap:");
        printMatrix(mat);
        System.out.println("============================================================");
    }

    private static void printMatrix(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print("   ");
            for (int j = 0; j < arr[i].length; j++) {
                System.out.print(arr[i][j] + "\t");
            }
            System.out.println();
        }
        System.out.println();
    }
}
