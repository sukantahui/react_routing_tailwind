public class AddressFormulaDemo {
    public static void main(String[] args) {
        // Example: 5x4 matrix, int (4 bytes), base 5000
        int M = 5, N = 4, base = 5000, size = 4;
        
        // Calculate address for element [2][3] in row-major
        int rowMajorAddr = base + (2 * N + 3) * size;
        System.out.println("Row-major [2][3]: " + rowMajorAddr); // 5000 + (8+3)*4 = 5044
        
        // Column-major calculation
        int colMajorAddr = base + (3 * M + 2) * size;
        System.out.println("Column-major [2][3]: " + colMajorAddr); // 5000 + (15+2)*4 = 5068
        
        // Show difference
        System.out.println("Difference: " + (colMajorAddr - rowMajorAddr) + " bytes");
    }
}