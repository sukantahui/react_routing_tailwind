public class ColumnMajorVisualization {
    public static void main(String[] args) {
        int rows = 3, cols = 4;
        int base = 1000;
        int size = 4;
        
        System.out.println("Column-major memory layout (addresses):");
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < rows; i++) {
                int addr = base + (j * rows + i) * size;
                System.out.printf("arr[%d][%d] @ %d  ", i, j, addr);
            }
            System.out.println();
        }
    }
}