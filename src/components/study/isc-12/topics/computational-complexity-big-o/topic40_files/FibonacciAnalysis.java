/**
 * Analyzes the growth of naive Fibonacci calls.
 * Shows that the number of calls grows exponentially.
 */
public class FibonacciAnalysis {
    public static void main(String[] args) {
        System.out.println("=== Fibonacci Analysis ===");
        System.out.println("n\t\tCalls (naive)\t\t2^n\t\tRatio");
        System.out.println("----------------------------------------------------");

        for (int n = 1; n <= 20; n++) {
            long calls = RecursiveFibonacci.fibCalls(n);
            long twoPowN = 1L << n; // 2^n
            double ratio = (double)calls / twoPowN;
            System.out.printf("%d\t\t%d\t\t%d\t\t%.3f\n", n, calls, twoPowN, ratio);
        }

        System.out.println("\nCalls ≈ 2^n (the ratio approaches 1 for large n)");
        System.out.println("Actually, calls = 2 * fib(n+1) - 1, which is O(2^n).");

        // Show the explosion
        System.out.println("\nFor n=40:");
        long calls40 = RecursiveFibonacci.fibCalls(40);
        System.out.println("calls = " + calls40);
        System.out.println("This is ≈ 2^40 = 1,099,511,627,776");
        System.out.println("At 1 billion calls per second, it would take ~1,100 seconds ≈ 18 minutes.");

        System.out.println("\nFor n=50:");
        long calls50 = RecursiveFibonacci.fibCalls(50);
        System.out.println("calls = " + calls50);
        System.out.println("This is ≈ 2^50 = 1.125 × 10^15");
        System.out.println("At 1 billion calls per second, it would take ~1,125,000 seconds ≈ 13 days.");

        System.out.println("\nThis exponential growth makes naive Fibonacci impractical for n > 30.");
        System.out.println("Memoization or iteration is essential.");
    }

    // Helper to compute expected calls (from RecursiveFibonacci)
    public static long fibCalls(int n) {
        if (n <= 1) return 1;
        return 1 + fibCalls(n - 1) + fibCalls(n - 2);
    }
}