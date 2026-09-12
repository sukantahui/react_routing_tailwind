/**
 * Topic 3 - Example 2: Optimal Single-Loop Diagonal Traversal O(N)
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Single loop O(N) calculation for both Left & Right diagonals
 * 2. Primary diagonal at [i][i], Secondary diagonal at [i][N - 1 - i]
 * 3. Avoiding double-counting the center element in odd-sized matrices (3x3, 5x5)
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class SingleLoopDiagonalsDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 3 · EXAMPLE 2: SINGLE-LOOP O(N) DIAGONAL TRAVERSAL");
        System.out.println("============================================================");

        int[][] mat = {
            {1,  2,  3},
            {4,  5,  6},
            {7,  8,  9}
        };

        int n = mat.length; // 3 (Odd dimension: center element exists at [1][1])

        System.out.println("Input 3x3 Matrix:");
        for (int i = 0; i < n; i++) {
            System.out.print("   ");
            for (int j = 0; j < n; j++) {
                System.out.print(mat[i][j] + "\t");
            }
            System.out.println();
        }
        System.out.println();

        int primarySum = 0;
        int secondarySum = 0;

        System.out.println("Single-Loop O(N) Execution Trace (i from 0 to " + (n - 1) + "):");
        for (int i = 0; i < n; i++) {
            int primVal = mat[i][i];
            int secVal  = mat[i][n - 1 - i];

            primarySum += primVal;
            secondarySum += secVal;

            System.out.printf("   Pass i = %d: Primary mat[%d][%d] = %d | Secondary mat[%d][%d] = %d\n",
                    i, i, i, primVal, i, (n - 1 - i), secVal);
        }
        System.out.println();

        System.out.println("Primary Diagonal Sum (Left-to-Right):   " + primarySum);
        System.out.println("Secondary Diagonal Sum (Right-to-Left): " + secondarySum);

        // Combined Diagonal Sum (Correct handling of center element for odd N)
        int combinedSum = primarySum + secondarySum;
        if (n % 2 != 0) {
            int centerIdx = n / 2;
            int centerVal = mat[centerIdx][centerIdx];
            combinedSum -= centerVal; // Subtract once because center was added to both diagonals!
            System.out.println("Notice: For odd N=" + n + ", center element mat[" + centerIdx + "][" + centerIdx + "] (" + centerVal + ") belongs to BOTH diagonals!");
            System.out.println("Total Distinct Diagonal Sum (Primary + Secondary - Center): " + combinedSum);
        } else {
            System.out.println("Total Diagonal Sum (Even N=" + n + "): " + combinedSum);
        }
        System.out.println("============================================================");
    }
}
