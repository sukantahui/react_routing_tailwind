public class AddressBothOrders {
    public static void main(String[] args) {
        int M = 4, N = 5, B = 1000, S = 4;
        int i = 2, j = 3;
        
        int rowMajorAddr = B + (i * N + j) * S;
        int colMajorAddr = B + (j * M + i) * S;
        
        System.out.println("Row-major: " + rowMajorAddr);
        System.out.println("Column-major: " + colMajorAddr);
        System.out.println("Difference: " + (colMajorAddr - rowMajorAddr) + " bytes");
    }
}