public class RowMajorDemo {
    public static void main(String[] args) {
        // Row-major: Accessing elements row by row
        int rows = 3, cols = 4;
        int[][] matrix = new int[rows][cols];
        int counter = 1;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = counter++;
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        // Row-major address calculation (hypothetical)
        int base = 1000, elementSize = 4;
        int i = 1, j = 2;
        int address = base + (i * cols + j) * elementSize;
        System.out.println("Address of A[1][2] in row-major: " + address);
    }
}