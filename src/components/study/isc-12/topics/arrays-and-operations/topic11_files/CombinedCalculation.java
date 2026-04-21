public class CombinedCalculation {
    public static void main(String[] args) {
        // Example: 2D array with row-major, int
        int rows = 4, cols = 5, base = 1000, size = Integer.BYTES;
        int i = 2, j = 3;
        int elementOffset = i * cols + j;
        int address = base + elementOffset * size;
        System.out.println("Row-major address: " + address);
        
        // Column-major example
        int base2 = 2000;
        int i2 = 1, j2 = 4;
        int elementOffset2 = j2 * rows + i2;
        int address2 = base2 + elementOffset2 * size;
        System.out.println("Column-major address: " + address2);
    }
}