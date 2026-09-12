/**
 * Topic 0 - Example 3: Jagged (Ragged) Array Declaration & Traversal
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Allocating 2D arrays with varying row lengths
 * 2. Pascal-style triangular array allocation
 * 3. Safe traversal using dynamic row lengths (jagged[i].length)
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class JaggedArrayDemo {

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println("  TOPIC 0 · EXAMPLE 3: JAGGED (RAGGED) ARRAYS IN JAVA");
        System.out.println("============================================================");

        // Step 1: Declare outer array with 4 rows, leaving column dimension unspecified
        int[][] jagged = new int[4][];

        // Step 2: Dynamically allocate each individual row with a different size
        jagged[0] = new int[2]; // Row 0 has 2 columns
        jagged[1] = new int[4]; // Row 1 has 4 columns
        jagged[2] = new int[3]; // Row 2 has 3 columns
        jagged[3] = new int[5]; // Row 3 has 5 columns

        // Step 3: Populate each cell with a generated value (row * 10 + col)
        for (int i = 0; i < jagged.length; i++) {
            for (int j = 0; j < jagged[i].length; j++) {
                jagged[i][j] = (i + 1) * 10 + (j + 1);
            }
        }

        // Step 4: Display each row's size and contents
        System.out.println("1. Traversing Non-Uniform Jagged Array:");
        for (int i = 0; i < jagged.length; i++) {
            System.out.print("Row " + i + " (Length " + jagged[i].length + "): \t");
            for (int j = 0; j < jagged[i].length; j++) {
                System.out.print(jagged[i][j] + "\t");
            }
            System.out.println();
        }
        System.out.println();

        // Step 5: Triangular Array (Pascal Triangle structure preview)
        int levels = 5;
        int[][] triangle = new int[levels][];
        for (int i = 0; i < levels; i++) {
            triangle[i] = new int[i + 1]; // Row i has i+1 elements
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    triangle[i][j] = 1; // Boundary 1s
                } else {
                    triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
                }
            }
        }

        System.out.println("2. Pascal's Triangle (Constructed via Jagged Allocation):");
        for (int i = 0; i < triangle.length; i++) {
            // Indent for pyramidal visualization
            for (int s = 0; s < levels - i; s++) {
                System.out.print("  ");
            }
            for (int j = 0; j < triangle[i].length; j++) {
                System.out.print(triangle[i][j] + "   ");
            }
            System.out.println();
        }
        System.out.println("============================================================");
    }
}
