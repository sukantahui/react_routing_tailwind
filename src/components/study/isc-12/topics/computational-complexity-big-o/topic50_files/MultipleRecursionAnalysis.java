/**
 * Analyzes multiple recursion: Exponential vs Linear.
 * Compares the number of calls and growth rates.
 */
public class MultipleRecursionAnalysis {
    public static void main(String[] args) {
        System.out.println("=== Multiple Recursion Analysis ===\n");

        System.out.println("Exponential (a=3, reduction by 1): T(n) = 3T(n-1) + O(1)");
        System.out.println("Linear (a=3, reduction by 3): T(n) = 3T(n/3) + O(1)");
        System.out.println();

        System.out.println("n\tExponential (3^n)\tLinear (3^log₃ n = n)");
        System.out.println("----------------------------------------------");

        for (int n = 1; n <= 10; n++) {
            long exp = (long)Math.pow(3, n);
            long lin = n;
            System.out.printf("%d\t%d\t\t\t%d\n", n, exp, lin);
        }

        System.out.println("\nFor n=20:");
        System.out.println("Exponential: 3^20 ≈ 3.4×10⁹ calls");
        System.out.println("Linear: 20 nodes");

        System.out.println("\nThe difference is astronomical!");
        System.out.println("Multiple recursion is only practical when:");
        System.out.println("  1. The branching factor is small (a is small)");
        System.out.println("  2. The reduction is by a (not by 1)");
        System.out.println("  3. Pruning can significantly reduce the search space");

        // Simulate practical example: n-queens pruning
        System.out.println("\n=== N-Queens Pruning Example ===");
        System.out.println("Without pruning: n^n possibilities");
        System.out.println("With pruning: n! possibilities (still factorial, but much smaller)");
        for (int n = 4; n <= 10; n++) {
            long withoutPruning = (long)Math.pow(n, n);
            long withPruning = factorial(n);
            System.out.printf("n=%d: n^n=%d, n!=%d\n", n, withoutPruning, withPruning);
        }
        System.out.println("Pruning reduces the search space significantly!");
    }

    public static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) result *= i;
        return result;
    }
}