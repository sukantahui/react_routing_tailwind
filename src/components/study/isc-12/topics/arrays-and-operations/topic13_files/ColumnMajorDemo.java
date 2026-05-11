public class ColumnMajorDemo {
    public static void main(String[] args) {
        // Column-major access (simulated in Java)
        int rows = 3, cols = 4;
        int[][] matrix = new int[rows][cols];
        int counter = 1;
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < rows; i++) {
                matrix[i][j] = counter++;
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        // Column-major address calculation
        int base = 1000, elementSize = 4;
        int i = 1, j = 2;
        int address = base + (j * rows + i) * elementSize;
        System.out.println("Address of A[1][2] in column-major: " + address);
    }
}