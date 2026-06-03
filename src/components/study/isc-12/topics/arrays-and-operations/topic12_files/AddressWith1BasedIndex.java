public class AddressWith1BasedIndex {
    public static void main(String[] args) {
        int M = 4, N = 5, B = 1000, S = 4;
        int i1 = 3, j1 = 4; // 1-based indices (row 3, col 4)
        int i0 = i1 - 1;
        int j0 = j1 - 1;
        int address = B + (i0 * N + j0) * S;
        System.out.println("1-based (3,4) -> 0-based (2,3) address: " + address); // 1052
    }
}