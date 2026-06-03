public class Array2DDeclaration {
    public static void main(String[] args) {
        // 2D array (matrix) with 3 rows and 4 columns
        int[][] matrix = new int[3][4];
        
        // Initializing with values
        int[][] scores = {
            {85, 90, 78, 92},
            {88, 76, 95, 89},
            {91, 84, 79, 93}
        };
        
        // Accessing element at row 1, column 2 (0-based index)
        int value = scores[1][2];  // 95
        System.out.println("Value at [1][2]: " + value);
        
        // Iterating over rows and columns (row-major)
        for (int i = 0; i < scores.length; i++) {
            for (int j = 0; j < scores[i].length; j++) {
                System.out.print(scores[i][j] + " ");
            }
            System.out.println();
        }
    }
}