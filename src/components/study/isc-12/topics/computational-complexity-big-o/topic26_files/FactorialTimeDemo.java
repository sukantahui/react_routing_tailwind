/**
 * Demonstrates factorial growth compared to exponential and quadratic growth.
 * Shows why O(n!) is the worst common complexity.
 */
public class FactorialTimeDemo {
    public static void main(String[] args) {
        System.out.println("n\t\tn²\t\t2ⁿ\t\tn!\t\tfeasible?");
        System.out.println("---------------------------------------------------------------");

        for (int n = 1; n <= 12; n++) {
            long nSquared = (long)n * n;
            long twoPowN = 1L << n; // 2^n
            long factorial = factorial(n);

            String feasible;
            if (n <= 7) feasible = "✅ instant";
            else if (n <= 10) feasible = "⚡ feasible";
            else feasible = "❌ impossible";

            System.out.printf("%d\t\t%d\t\t%d\t\t%d\t\t%s\n",
                n, nSquared, twoPowN, factorial, feasible);
        }

        System.out.println("\nFor n=20, 20! ≈ 2.4 × 10^18 — this is more than the number of");
        System.out.println("seconds since the Big Bang (~10^17 seconds).");
        System.out.println("This is why O(n!) is considered 'intractable'.");
    }

    public static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) result *= i;
        return result;
    }
}