/**
 * Topic 0: Declaration and Memory Representation of 2D Arrays
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class MatrixDeclarationDemo {

    public static void main(String[] args) {
        // Method 1: Dynamic Allocation using new operator (3 rows x 3 columns)
        // In Java, Heap allocates 1 primary array of 3 references + 3 sub-arrays of integers
        int[][] dynamicMatrix = new int[3][3];

        // Method 2: Direct Literal Initializer (Pre-populated values)
        int[][] literalMatrix = {
            {10, 20, 30},
            {40, 50, 60},
            {70, 80, 90}
        };

        System.out.println("==================================================");
        System.out.println("  ICSE CLASS X: 2D ARRAY DECLARATION & MEMORY DEMO");
        System.out.println("==================================================");

        // Printing dimension information using .length property
        System.out.println("Literal Matrix Dimensions:");
        System.out.println("Number of Rows (matrix.length):       " + literalMatrix.length);
        System.out.println("Number of Columns (matrix[0].length): " + literalMatrix[0].length);
        System.out.println("Total Element Cells:                  " + (literalMatrix.length * literalMatrix[0].length));
        System.out.println();

        // Traversing and printing literal matrix in tabular format
        System.out.println("--- Tabular Grid Output (Row-Wise) ---");
        for (int i = 0; i < literalMatrix.length; i++) {
            for (int j = 0; j < literalMatrix[i].length; j++) {
                System.out.print(literalMatrix[i][j] + "\t");
            }
            System.out.println(); // Newline after each row
        }
        System.out.println();

        // Inspecting Default Values in Dynamic Matrix
        System.out.println("--- Default Values in Dynamic Matrix (int[3][3]) ---");
        for (int i = 0; i < dynamicMatrix.length; i++) {
            for (int j = 0; j < dynamicMatrix[i].length; j++) {
                System.out.print(dynamicMatrix[i][j] + "\t"); // Default is 0 for int
            }
            System.out.println();
        }
        System.out.println();

        // Demonstrating Jagged Array Concept (Array of Arrays with variable row sizes)
        int[][] jaggedArray = new int[3][];
        jaggedArray[0] = new int[2]; // Row 0 has 2 elements
        jaggedArray[1] = new int[4]; // Row 1 has 4 elements
        jaggedArray[2] = new int[3]; // Row 2 has 3 elements

        System.out.println("--- Jagged Array Row Sizes (Array of Arrays) ---");
        for (int i = 0; i < jaggedArray.length; i++) {
            System.out.println("Row " + i + " length (jaggedArray[" + i + "].length): " + jaggedArray[i].length);
        }
        System.out.println("==================================================");
    }
}

/*
 * ============================================================================
 * VARIABLE DESCRIPTION TABLE (ICSE BOARD STANDARD DOCUMENTATION)
 * ============================================================================
 * Variable Name   Data Type   Purpose
 * ----------------------------------------------------------------------------
 * dynamicMatrix   int[][]     Stores dynamically allocated 3x3 2D array
 * literalMatrix   int[][]     Stores pre-initialized 3x3 matrix values
 * jaggedArray     int[][]     Demonstrates array of arrays with different row lengths
 * i               int         Loop counter for row traversal
 * j               int         Loop counter for column traversal
 * ============================================================================
 */