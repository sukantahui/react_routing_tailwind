public class RowMajorFormulaBasic {
    public static void main(String[] args) {
        // Example: int arr[4][5], base=1000, element size=4
        int rows = 4, cols = 5, base = 1000, size = 4;
        int i = 2, j = 3;
        int offset = i * cols + j;
        int address = base + offset * size;
        System.out.println("Address of arr[2][3] = " + address); // 1052
    }
}