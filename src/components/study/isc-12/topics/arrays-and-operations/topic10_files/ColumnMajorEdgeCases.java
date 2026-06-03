public class ColumnMajorEdgeCases {
    public static void main(String[] args) {
        // Case 1: 1-based indices to 0-based
        int base = 1000, rows = 5, size = 4;
        int i1 = 3, j1 = 4; // 1-based
        int i0 = i1 - 1, j0 = j1 - 1;
        int address = base + (j0 * rows + i0) * size;
        System.out.println("1-based to column-major address: " + address);
        
        // Case 2: Column padding (stride > rows)
        int actualRows = 5;
        int stride = 8; // padded to 8 rows per column
        int i = 2, j = 3;
        int paddedAddress = base + (j * stride + i) * size;
        int withoutPadding = base + (j * actualRows + i) * size;
        System.out.println("With padding: " + paddedAddress);
        System.out.println("Without padding: " + withoutPadding);
        
        // Case 3: 3D column-major (Fortran order)
        int M = 3, N = 4, K = 5; // dimensions: A(i,j,k) with i fastest
        int base3d = 10000, size3d = 4;
        int i3 = 1, j3 = 2, k3 = 3; // 0-based
        int offset3d = ((k3 * N * M) + (j3 * M) + i3);
        int addr3d = base3d + offset3d * size3d;
        System.out.println("3D column-major address: " + addr3d);
    }
}