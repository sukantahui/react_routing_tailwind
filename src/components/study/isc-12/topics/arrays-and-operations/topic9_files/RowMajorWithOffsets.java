public class RowMajorWithOffsets {
    public static void main(String[] args) {
        int rows = 5, cols = 6;
        int base = 2000;
        int size = 8; // double
        
        // Precompute row offsets
        int[] rowOffset = new int[rows];
        for (int i = 0; i < rows; i++) {
            rowOffset[i] = i * cols * size;
        }
        
        int i = 3, j = 4;
        int address = base + rowOffset[i] + j * size;
        System.out.println("Address using row offset: " + address);
        // Direct formula: base + (i*cols + j)*size
        int direct = base + (i * cols + j) * size;
        System.out.println("Direct formula: " + direct);
    }
}