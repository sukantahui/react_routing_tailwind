public class ColumnMajorCalculation {
    public static void main(String[] args) {
        int rows = 3, cols = 6;
        int baseAddress = 2000;
        int elementSize = 8; // double is 8 bytes
        
        int i = 1, j = 4;
        int address = baseAddress + (j * rows + i) * elementSize;
        System.out.println("Column-major: Address of arr[1][4] = " + address);
        // Output: 2104
    }
}