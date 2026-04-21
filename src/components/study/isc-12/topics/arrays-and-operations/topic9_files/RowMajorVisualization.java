public class RowMajorVisualization {
    public static void main(String[] args) {
        int rows = 3, cols = 4;
        int base = 1000;
        int size = 4;
        
        System.out.println("Row-major memory layout (addresses):");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int addr = base + (i * cols + j) * size;
                System.out.printf("arr[%d][%d] @ %d  ", i, j, addr);
            }
            System.out.println();
        }
    }
}