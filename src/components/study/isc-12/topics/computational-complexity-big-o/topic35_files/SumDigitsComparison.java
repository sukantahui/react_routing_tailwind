/**
 * Compares recursive and iterative implementations of sum of digits.
 * Both are O(log n) time, but recursive uses O(log n) space,
 * iterative uses O(1) space.
 */
public class SumDigitsComparison {
    public static void main(String[] args) {
        long n = 1234567890L;

        System.out.println("=== Sum of Digits Comparison ===");
        System.out.println("n = " + n);
        System.out.println();

        // Recursive
        long start = System.nanoTime();
        int recSum = recursiveSumDigits(n);
        long end = System.nanoTime();
        System.out.println("Recursive: " + recSum + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(log n), Space: O(log n)");

        // Iterative
        start = System.nanoTime();
        int iterSum = iterativeSumDigits(n);
        end = System.nanoTime();
        System.out.println("Iterative: " + iterSum + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(log n), Space: O(1)");

        // Both should be equal
        System.out.println("\nBoth methods give the same result: " + (recSum == iterSum));

        // Show steps for different n
        System.out.println("\nSteps for different n:");
        for (long num : new long[]{10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000}) {
            int steps = countStepsIterative(num);
            System.out.println("n = " + num + " → " + steps + " steps");
        }
        System.out.println("Steps grow logarithmically with n.");
    }

    // Recursive: O(log n) time, O(log n) space
    public static int recursiveSumDigits(long n) {
        if (n == 0) return 0;
        return (int)(n % 10) + recursiveSumDigits(n / 10);
    }

    // Iterative: O(log n) time, O(1) space
    public static int iterativeSumDigits(long n) {
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }

    // Count steps for iterative version
    public static int countStepsIterative(long n) {
        int steps = 0;
        while (n > 0) {
            steps++;
            n /= 10;
        }
        return steps;
    }
}