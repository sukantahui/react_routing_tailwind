/**
 * Recursive Decimal to Binary Conversion
 * Recurrence: T(n) = T(n/2) + O(1), T(0) = O(1)
 * Time Complexity: O(log n) — number of bits = ⌊log₂(n)⌋ + 1
 * Space Complexity: O(log n) — recursion stack depth = number of bits
 * 
 * Note: String concatenation in recursion creates new strings.
 * For large n, use StringBuilder (see BinaryStringBuilder.java).
 */
public class DecimalToBinary {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int[] testNumbers = {0, 1, 2, 3, 5, 8, 13, 42, 100, 255, 1024};

        System.out.println("=== Decimal to Binary (Recursive) ===");
        for (int n : testNumbers) {
            callCount = 0;
            maxDepth = 0;
            String binary = toBinary(n);
            System.out.println("Decimal: " + n + " → Binary: " + binary);
            System.out.println("  Calls: " + callCount + ", Depth: " + maxDepth);
        }

        System.out.println("\nTime: O(log n), Space: O(log n)");
        System.out.println("Number of bits = floor(log₂(n)) + 1");
    }

    public static String toBinary(int n) {
        callCount++;
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Base case: 0 in binary is "0"
        if (n == 0) {
            depth--;
            return "0";
        }

        // Recursive case: toBinary(n/2) + (n % 2)
        String result = toBinary(n / 2) + (n % 2);
        depth--;
        return result;
    }

    private static int depth = 0;
}