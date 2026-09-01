public class MatrixDeclarationDemo {
    public static void main(String[] args) {
        // Direct declaration and initialization of 3x3 2D array
        int[][] matrix = {
            {10, 20, 30},
            {40, 50, 60},
            {70, 80, 90}
        };

        System.out.println("Matrix Dimensions: " + matrix.length + " rows x " + matrix[0].length + " columns\n");

        // Displaying matrix using nested loops
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }
    }
}