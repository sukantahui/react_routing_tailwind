public class CompareStorage {
    public static void main(String[] args) {
        int M = 3, N = 4;
        int[] rowMajor = new int[M*N];
        int[] colMajor = new int[M*N];
        
        // Fill row-major layout: row0, row1, row2
        for (int i = 0; i < M; i++) {
            for (int j = 0; j < N; j++) {
                rowMajor[i*N + j] = i*N + j;
            }
        }
        
        // Fill column-major layout: col0, col1, col2, col3
        for (int j = 0; j < N; j++) {
            for (int i = 0; i < M; i++) {
                colMajor[j*M + i] = i*N + j;
            }
        }
        
        System.out.println("Row-major order (indices):");
        for (int val : rowMajor) System.out.print(val + " ");
        System.out.println();
        
        System.out.println("Column-major order (indices):");
        for (int val : colMajor) System.out.print(val + " ");
        System.out.println();
    }
}