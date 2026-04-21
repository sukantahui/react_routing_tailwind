public class AddressWithPadding {
    public static void main(String[] args) {
        int M = 4, actualN = 5, stride = 8; // padded to 8 columns
        int B = 1000, S = 4;
        int i = 2, j = 3;
        int addressWithPadding = B + (i * stride + j) * S;
        int addressWithoutPadding = B + (i * actualN + j) * S;
        System.out.println("With padding (stride=8): " + addressWithPadding);
        System.out.println("Without padding: " + addressWithoutPadding);
    }
}