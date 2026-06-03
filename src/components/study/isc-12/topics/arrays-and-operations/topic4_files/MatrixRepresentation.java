public class MatrixRepresentation {
    public static void main(String[] args) {
        // Declaring and initializing a 2D array (3 rows, 4 columns)
        int[][] marks = {
            {85, 90, 78, 92},
            {88, 76, 95, 89},
            {91, 84, 79, 93}
        };
        
        // Accessing elements
        System.out.println("Element at row 1, column 2: " + marks[1][2]); // 95
        
        // Getting dimensions
        int rows = marks.length;
        int cols = marks[0].length;
        System.out.println("Rows: " + rows + ", Columns: " + cols);
        
        // Printing the matrix
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(marks[i][j] + " ");
            }
            System.out.println();
        }
    }
}