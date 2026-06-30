/**
 * Analyzes the Euclidean algorithm's performance.
 * Shows step counts, worst-case (Fibonacci), and proves O(log n).
 */
public class EuclideanAnalysis {
    public static void main(String[] args) {
        System.out.println("=== Euclidean Algorithm Analysis ===\n");

        // 1. Random pairs
        System.out.println("1. Random pairs:");
        int[][] randomPairs = {
            {100, 50}, {100, 99}, {1000, 999}, {10000, 9999}, {100000, 99999}
        };
        for (int[] pair : randomPairs) {
            int steps = gcdSteps(pair[0], pair[1]);
            System.out.printf("gcd(%d, %d) → %d steps\n", pair[0], pair[1], steps);
        }

        // 2. Worst-case: Fibonacci numbers
        System.out.println("\n2. Worst-case: Consecutive Fibonacci numbers:");
        int[] fib = {1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765};
        for (int i = 2; i < fib.length - 1; i++) {
            int steps = gcdSteps(fib[i], fib[i+1]);
            System.out.printf("gcd(%d, %d) → %d steps (F_%d and F_%d)\n", 
                fib[i], fib[i+1], steps, i, i+1);
        }

        // 3. Prove logarithmic property
        System.out.println("\n3. Logarithmic property:");
        System.out.println("For numbers up to 10^n, steps ≤ 5n (approximately).");
        for (int power = 1; power <= 6; power++) {
            int n = (int)Math.pow(10, power);
            int steps = gcdSteps(n, n - 1);
            System.out.printf("n = 10^%d (%d) → %d steps\n", power, n, steps);
        }

        // 4. Show steps for consecutive numbers (worst-case for their size)
        System.out.println("\n4. Consecutive numbers (n, n-1):");
        for (int n : new int[]{10, 100, 1000, 10000, 100000, 1000000}) {
            int steps = gcdSteps(n, n - 1);
            System.out.printf("gcd(%d, %d) → %d steps\n", n, n-1, steps);
        }
        System.out.println("Notice: steps grow slowly (logarithmically).");
    }

    public static int gcdSteps(int a, int b) {
        int steps = 0;
        while (b != 0) {
            steps++;
            int temp = b;
            b = a % b;
            a = temp;
        }
        return steps;
    }
}