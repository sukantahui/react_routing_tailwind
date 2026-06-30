/**
 * Analyzes the decimal-to-binary conversion.
 * Shows steps, depth, and compares different approaches.
 */
public class BinaryConversionAnalysis {
    public static void main(String[] args) {
        System.out.println("=== Binary Conversion Analysis ===\n");

        // 1. Show steps for different numbers
        System.out.println("Number\tBits\tCalls\tDepth\tBinary");
        System.out.println("--------------------------------------------");

        int[] numbers = {0, 1, 2, 3, 4, 5, 7, 8, 15, 16, 31, 32, 63, 64, 127, 128, 255, 256, 1000, 1024};
        for (int n : numbers) {
            int bits = Integer.toBinaryString(n).length();
            int steps = (int)(Math.log(n) / Math.log(2)) + 1;
            if (n == 0) steps = 1;
            String binary = Integer.toBinaryString(n);
            System.out.printf("%d\t%d\t%d\t%d\t%s\n", n, bits, steps, steps, binary);
        }

        // 2. Show the recurrence
        System.out.println("\n=== Recurrence Relation ===");
        System.out.println("T(n) = T(n/2) + O(1), T(0) = O(1)");
        System.out.println("Solution: T(n) = O(log n)");
        System.out.println("Space: O(log n) (recursion stack)");

        // 3. Compare string concatenation vs StringBuilder
        System.out.println("\n=== String Building Efficiency ===");
        System.out.println("String concatenation:");
        System.out.println("  - Each concat copies O(k) characters, where k is the current length");
        System.out.println("  - Total: O(1 + 2 + 3 + ... + log n) = O(log² n)");
        System.out.println("StringBuilder:");
        System.out.println("  - Each append is O(1) amortized");
        System.out.println("  - Total: O(log n)");
        System.out.println("For large n, StringBuilder is much faster.");

        // 4. Show the number of bits for large numbers
        System.out.println("\n=== Number of Bits ===");
        long[] large = {1000L, 10000L, 100000L, 1000000L, 10000000L, 100000000L, 1000000000L};
        for (long n : large) {
            int bits = (int)(Math.log(n) / Math.log(2)) + 1;
            System.out.printf("%d → %d bits\n", n, bits);
        }
        System.out.println("Even for 1 billion, only 30 bits — O(log n)!");
    }
}