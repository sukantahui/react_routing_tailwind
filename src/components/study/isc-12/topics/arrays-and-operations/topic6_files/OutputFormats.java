public class OutputFormats {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Method 1: Nested loops
        System.out.println("Method 1: Nested loops");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        
        // Method 2: Enhanced for loop
        System.out.println("\nMethod 2: Enhanced for loop");
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
        
        // Method 3: Arrays.deepToString (for debugging)
        System.out.println("\nMethod 3: Arrays.deepToString");
        System.out.println(java.util.Arrays.deepToString(matrix));
    }
}