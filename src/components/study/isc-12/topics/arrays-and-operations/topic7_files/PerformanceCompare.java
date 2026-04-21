public class PerformanceCompare {
    public static void main(String[] args) {
        int size = 5000;
        int[][] matrix = new int[size][size];
        
        // Initialize with some values
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                matrix[i][j] = i + j;
            }
        }
        
        // Row-wise traversal
        long start = System.nanoTime();
        long sumRow = 0;
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                sumRow += matrix[i][j];
            }
        }
        long end = System.nanoTime();
        System.out.println("Row-wise time: " + (end - start) / 1e6 + " ms");
        
        // Column-wise traversal
        start = System.nanoTime();
        long sumCol = 0;
        for (int j = 0; j < size; j++) {
            for (int i = 0; i < size; i++) {
                sumCol += matrix[i][j];
            }
        }
        end = System.nanoTime();
        System.out.println("Column-wise time: " + (end - start) / 1e6 + " ms");
        
        // Row-wise is typically much faster (2x-10x) due to caching
    }
}