/**
 * Compares different implementations of sum(1..n):
 * 1. Iterative (O(n) time, O(1) space)
 * 2. Recursive (O(n) time, O(n) space)
 * 3. Formula (O(1) time, O(1) space)
 */
public class SumComparison {
    public static void main(String[] args) {
        int n = 100000;

        System.out.println("=== Sum Comparison ===");
        System.out.println("n = " + n);
        System.out.println();

        // 1. Iterative
        long start = System.nanoTime();
        long iterSum = iterativeSum(n);
        long end = System.nanoTime();
        System.out.println("Iterative: " + iterSum + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(n), Space: O(1)");

        // 2. Recursive (for smaller n to avoid stack overflow)
        int smallN = 10000;
        System.out.println("\nRecursive (n=" + smallN + "):");
        start = System.nanoTime();
        long recSum = recursiveSum(smallN);
        end = System.nanoTime();
        System.out.println("  Recursive: " + recSum + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(n), Space: O(n)");
        System.out.println("  (Using n=" + smallN + " to avoid stack overflow)");

        // 3. Formula
        start = System.nanoTime();
        long formulaSum = formulaSum(n);
        end = System.nanoTime();
        System.out.println("\nFormula: " + formulaSum + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(1), Space: O(1)");

        System.out.println("\nThe formula is the best in all cases!");
        System.out.println("Iterative is better than recursive for large n due to O(1) space.");
        System.out.println("Recursive is useful for educational purposes.");
    }

    // O(n) time, O(1) space
    public static long iterativeSum(int n) {
        long sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }

    // O(n) time, O(n) space (recursion stack)
    public static long recursiveSum(int n) {
        if (n == 0) return 0;
        return n + recursiveSum(n - 1);
    }

    // O(1) time, O(1) space
    public static long formulaSum(int n) {
        return (long) n * (n + 1) / 2;
    }
}