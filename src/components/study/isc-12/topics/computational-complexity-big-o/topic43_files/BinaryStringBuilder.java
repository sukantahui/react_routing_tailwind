/**
 * Recursive Decimal to Binary Conversion using StringBuilder
 * This version avoids O(n²) string concatenation.
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) — recursion stack + StringBuilder
 */
public class BinaryStringBuilder {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 1000;
        callCount = 0;
        maxDepth = 0;

        StringBuilder sb = new StringBuilder();
        toBinary(n, sb);
        String binary = sb.toString();

        System.out.println("Decimal to Binary (with StringBuilder)");
        System.out.println("Decimal: " + n + " → Binary: " + binary);
        System.out.println("Binary length: " + binary.length());
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(log n), Space: O(log n)");

        // Compare with Integer.toBinaryString()
        System.out.println("\nInteger.toBinaryString(" + n + ") = " + Integer.toBinaryString(n));
        System.out.println("Matches: " + binary.equals(Integer.toBinaryString(n)));

        // Show the difference in performance (conceptual)
        System.out.println("\nUsing StringBuilder is more efficient than string concatenation.");
        System.out.println("String concatenation in recursion creates O(n²) character copies.");
        System.out.println("StringBuilder appends in O(1) amortized time.");
    }

    public static void toBinary(int n, StringBuilder sb) {
        callCount++;
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Base case: 0 in binary is "0"
        if (n == 0) {
            sb.append('0');
            depth--;
            return;
        }

        // Recursive case: build from the inside out
        toBinary(n / 2, sb);
        sb.append(n % 2);
        depth--;
    }

    private static int depth = 0;
}