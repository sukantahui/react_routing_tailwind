public class MatrixDimensions {
    public static void main(String[] args) {
        // 2 rows, 3 columns
        int[][] matrix = new int[2][3];
        
        System.out.println("Number of rows: " + matrix.length);        // 2
        System.out.println("Number of columns: " + matrix[0].length);  // 3
        System.out.println("Total elements: " + (matrix.length * matrix[0].length)); // 6
        
        // Jagged array example
        int[][] jagged = new int[3][];
        jagged[0] = new int[2];
        jagged[1] = new int[4];
        jagged[2] = new int[1];
        
        System.out.println("\nJagged array rows: " + jagged.length);
        for (int i = 0; i < jagged.length; i++) {
            System.out.println("Row " + i + " has " + jagged[i].length + " columns");
        }
    }
}