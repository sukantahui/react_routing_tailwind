/**
 * Topic 0 - Example 2: Matrix Dimensions and Memory Architecture
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. matrix.length (rows) vs matrix[i].length (columns)
 * 2. Array of Arrays memory addresses & object references
 * 3. Default element initialization across primitive and reference types
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class MatrixDimensionsAndMemoryDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 0 · EXAMPLE 2: 2D ARRAY DIMENSIONS & MEMORY REFS");
        System.out.println("============================================================");

        // 1. Instantiating a rectangular 3x4 integer matrix
        int rows = 3;
        int cols = 4;
        int[][] grid = new int[rows][cols];

        // 2. Proving "Array of Arrays" structure
        System.out.println("1. Memory Reference Hierarchy:");
        System.out.println("   grid reference (Stack -> Heap row pointer):  " + grid);
        System.out.println("   grid[0] reference (Heap -> Row 0 1D array): " + grid[0]);
        System.out.println("   grid[1] reference (Heap -> Row 1 1D array): " + grid[1]);
        System.out.println("   grid[2] reference (Heap -> Row 2 1D array): " + grid[2]);
        System.out.println();

        // 3. Dimension Inspection using .length property
        System.out.println("2. Dimension Inspection via .length Property:");
        System.out.println("   Outer array length (grid.length = Number of Rows):    " + grid.length);
        for (int r = 0; r < grid.length; r++) {
            System.out.println("   Row " + r + " length (grid[" + r + "].length = Columns in Row " + r + "): " + grid[r].length);
        }
        System.out.println("   Total elements (Rows x Cols): " + (grid.length * grid[0].length));
        System.out.println();

        // 4. Default initialization across different primitive types
        System.out.println("3. Default Values in Uninitialized 2D Arrays:");
        double[][] floatMat = new double[2][2];
        boolean[][] boolMat = new boolean[2][2];
        String[][] strMat   = new String[2][2];

        System.out.println("   int default cell value:     " + grid[0][0]);
        System.out.println("   double default cell value:  " + floatMat[0][0]);
        System.out.println("   boolean default cell value: " + boolMat[0][0]);
        System.out.println("   String default cell value:  " + strMat[0][0]);
        System.out.println();

        // 5. Demonstrating that changing a row changes the reference
        int[] replacementRow = {99, 88, 77, 66};
        grid[1] = replacementRow; // Point row 1 to a completely new 1D array
        System.out.println("4. After Reassigning grid[1] to a New 1D Array:");
        System.out.println("   New grid[1] reference: " + grid[1]);
        System.out.print("   Row 1 values: ");
        for (int val : grid[1]) {
            System.out.print(val + " ");
        }
        System.out.println("\n============================================================");
    }
}
