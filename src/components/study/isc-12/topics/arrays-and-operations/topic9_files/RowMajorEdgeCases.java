public class RowMajorEdgeCases {
    public static void main(String[] args) {
        // Case 1: 1-based indices (convert to 0-based)
        int base = 1000, cols = 5, size = 4;
        int i1 = 3, j1 = 4; // 1-based (row 3, col 4)
        int i0 = i1 - 1, j0 = j1 - 1;
        int address = base + (i0 * cols + j0) * size;
        System.out.println("1-based to 0-based address: " + address);
        
        // Case 2: Large array requiring long
        long baseLong = 0x100000000L; // 4GB
        long rowsLong = 100000, colsLong = 100000;
        long offsetLong = 50000L * colsLong + 50000L;
        long addressLong = baseLong + offsetLong * 4; // int size 4
        System.out.println("Large array address (long): " + addressLong);
        
        // Case 3: Padding simulation
        int actualCols = 5;
        int stride = 8; // padding to 8 columns
        int i = 2, j = 3;
        int paddedAddress = base + (i * stride + j) * size;
        int withoutPadding = base + (i * actualCols + j) * size;
        System.out.println("With padding: " + paddedAddress);
        System.out.println("Without padding: " + withoutPadding);
    }
}