public class RowMajorCalculation {
    public static void main(String[] args) {
        // Simulating row-major address calculation
        int rows = 4, cols = 5;
        int baseAddress = 1000;
        int elementSize = 4; // int is 4 bytes
        
        int i = 2, j = 3;
        int address = baseAddress + (i * cols + j) * elementSize;
        System.out.println("Row-major: Address of arr[2][3] = " + address);
        // Output: 1052
    }
}