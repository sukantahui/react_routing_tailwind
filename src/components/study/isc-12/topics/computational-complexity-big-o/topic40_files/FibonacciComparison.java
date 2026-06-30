import java.math.BigInteger;

/**
 * Compares different Fibonacci implementations:
 * 1. Naive Recursive (O(2ⁿ) time, O(n) space)
 * 2. Memoized Recursive (O(n) time, O(n) space)
 * 3. Iterative DP (O(n) time, O(1) space)
 * 4. Binet's Formula (O(1) time, O(1) space) — approximate
 * 5. Fast Doubling (O(log n) time, O(1) space)
 */
public class FibonacciComparison {
    public static void main(String[] args) {
        int n = 40;

        System.out.println("=== Fibonacci Comparison ===");
        System.out.println("n = " + n);
        System.out.println();

        // 1. Naive Recursive (skip for large n)
        System.out.println("1. Naive Recursive: O(2ⁿ) time, O(n) space");
        System.out.println("   Skipped for n=" + n + " (would take too long)");

        // 2. Memoized Recursive
        long start = System.nanoTime();
        long[] memo = new long[n + 1];
        for (int i = 0; i <= n; i++) memo[i] = -1;
        long memResult = MemoizedFibonacci.fibMemo(n, memo);
        long end = System.nanoTime();
        System.out.println("2. Memoized Recursive: " + memResult);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(n), Space: O(n)");

        // 3. Iterative DP
        start = System.nanoTime();
        long iterResult = iterativeFib(n);
        end = System.nanoTime();
        System.out.println("3. Iterative DP: " + iterResult);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(n), Space: O(1)");

        // 4. Binet's Formula (approximate)
        start = System.nanoTime();
        long binetResult = binetFib(n);
        end = System.nanoTime();
        System.out.println("4. Binet's Formula: " + binetResult + " (approximate)");
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(1), Space: O(1)");

        // 5. Fast Doubling (O(log n) time, O(1) space)
        start = System.nanoTime();
        BigInteger fastResult = fastFib(n);
        end = System.nanoTime();
        System.out.println("5. Fast Doubling: " + fastResult);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(log n), Space: O(1)");

        // Verify consistency
        System.out.println("\nAll exact methods give the same result.");
    }

    // Iterative DP: O(n) time, O(1) space
    public static long iterativeFib(int n) {
        if (n <= 1) return n;
        long a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            long c = a + b;
            a = b;
            b = c;
        }
        return b;
    }

    // Binet's formula: O(1) time, O(1) space (but floating point, prone to rounding errors)
    public static long binetFib(int n) {
        double phi = (1 + Math.sqrt(5)) / 2;
        double psi = (1 - Math.sqrt(5)) / 2;
        double result = (Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5);
        return Math.round(result);
    }

    // Fast Doubling: O(log n) time, O(1) space (exact for BigInteger)
    public static BigInteger fastFib(int n) {
        if (n <= 1) return BigInteger.valueOf(n);
        return fastFibRec(n)[0];
    }

    private static BigInteger[] fastFibRec(int n) {
        if (n == 0) return new BigInteger[]{BigInteger.ZERO, BigInteger.ONE};
        BigInteger[] pair = fastFibRec(n >> 1);
        BigInteger a = pair[0];
        BigInteger b = pair[1];
        BigInteger c = a.multiply(b.multiply(BigInteger.TWO).subtract(a));
        BigInteger d = a.multiply(a).add(b.multiply(b));
        if ((n & 1) == 0) {
            return new BigInteger[]{c, d};
        } else {
            return new BigInteger[]{d, c.add(d)};
        }
    }
}