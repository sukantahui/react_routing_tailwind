public class PerformanceComparison {
    public static void main(String[] args) {
        int size = 1000;
        int[][] matrix = new int[size][size];
        // Row-wise traversal (cache friendly in row-major languages)
        long start = System.nanoTime();
        for (int i = 0; i < size; i++)
            for (int j = 0; j < size; j++)
                matrix[i][j] = i + j;
        long rowTime = System.nanoTime() - start;
        
        // Column-wise traversal (poor locality in row-major)
        start = System.nanoTime();
        for (int j = 0; j < size; j++)
            for (int i = 0; i < size; i++)
                matrix[i][j] = i + j;
        long colTime = System.nanoTime() - start;
        
        System.out.println("Row-wise time: " + rowTime + " ns");
        System.out.println("Column-wise time: " + colTime + " ns");
        System.out.println("Row-major languages prefer row-wise traversal.");
    }
}