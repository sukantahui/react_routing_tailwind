public class AddressColumnMajor {
    public static void main(String[] args) {
        int M = 4, N = 5, B = 1000, S = 4;
        int i = 2, j = 3;
        int offset = j * M + i;
        int address = B + offset * S;
        System.out.println("Column-major address of arr[2][3] = " + address); // 1056
    }
}