public class ColumnMajorWithOffsets {
    public static void main(String[] args) {
        int rows = 5, cols = 6;
        int base = 2000;
        int size = 8; // double
        
        // Precompute column offsets
        int[] colOffset = new int[cols];
        for (int j = 0; j < cols; j++) {
            colOffset[j] = j * rows * size;
        }
        
        int i = 3, j = 4;
        int address = base + colOffset[j] + i * size;
        System.out.println("Address using column offset: " + address);
        // Direct formula
        int direct = base + (j * rows + i) * size;
        System.out.println("Direct formula: " + direct);
    }
}