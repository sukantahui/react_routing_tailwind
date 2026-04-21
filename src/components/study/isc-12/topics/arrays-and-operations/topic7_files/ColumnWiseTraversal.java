public class ColumnWiseTraversal {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int rows = matrix.length;
        int cols = matrix[0].length; // assumes rectangular
        
        System.out.println("Column-wise traversal (column-major):");
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < rows; i++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println(); // new line after each column
        }
        // Output:
        // 1 4 7 
        // 2 5 8 
        // 3 6 9
    }
}