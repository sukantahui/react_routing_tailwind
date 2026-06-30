import java.math.BigInteger;

/**
 * Compares recursive and iterative implementations of factorial.
 * Both are O(n) time, but recursive uses O(n) space, iterative uses O(1) space.
 * Also demonstrates BigInteger for large values.
 */
public class FactorialComparison {
    public static void main(String[] args) {
        int n = 20;

        System.out.println("=== Factorial Comparison ===");
        System.out.println("n = " + n);
        System.out.println();

        // Recursive
        long start = System.nanoTime();
        long recFact = recursiveFactorial(n);
        long end = System.nanoTime();
        System.out.println("Recursive: " + n + "! = " + recFact + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(n), Space: O(n)");

        // Iterative
        start = System.nanoTime();
        long iterFact = iterativeFactorial(n);
        end = System.nanoTime();
        System.out.println("Iterative: " + n + "! = " + iterFact + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(n), Space: O(1)");

        // BigInteger for large n
        System.out.println("\nLarge factorial using BigInteger:");
        for (int i = 20; i <= 30; i++) {
            BigInteger bigFact = bigFactorial(i);
            System.out.println(i + "! = " + bigFact);
        }
        System.out.println("\nIterative is preferred in practice due to O(1) space.");
        System.out.println("BigInteger handles arbitrarily large values without overflow.");
    }

    // Recursive: O(n) time, O(n) space
    public static long recursiveFactorial(int n) {
        if (n <= 1) return 1;
        return n * recursiveFactorial(n - 1);
    }

    // Iterative: O(n) time, O(1) space
    public static long iterativeFactorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // BigInteger: O(n) time, O(1) space (but BigInteger objects have O(log n) space)
    public static BigInteger bigFactorial(int n) {
        BigInteger result = BigInteger.ONE;
        for (int i = 2; i <= n; i++) {
            result = result.multiply(BigInteger.valueOf(i));
        }
        return result;
    }
}