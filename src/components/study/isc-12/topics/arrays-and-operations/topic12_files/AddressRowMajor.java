public class AddressRowMajor {
    public static void main(String[] args) {
        // Example: int arr[4][5], base=1000, element size=4
        int M = 4, N = 5, B = 1000, S = 4;
        int i = 2, j = 3;
        int offset = i * N + j;
        int address = B + offset * S;
        System.out.println("Row-major address of arr[2][3] = " + address); // 1052
    }
}