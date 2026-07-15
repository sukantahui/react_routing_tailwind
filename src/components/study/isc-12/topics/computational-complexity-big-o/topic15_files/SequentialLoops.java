/**
 * Demonstrates sequential loops with different variables.
 * Complexity: O(n) + O(m) = O(n+m).
 */
public class SequentialLoops {
    public static void main(String[] args) {
        int n = 1000;
        int m = 500;

        System.out.println("Sequential loops: O(n) + O(m) = O(n+m)");

        // Loop 1: O(n)
        long start = System.nanoTime();
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i;
        }
        long end = System.nanoTime();
        System.out.println("Loop 1 (n=" + n + ") took " + (end - start) + " ns");

        // Loop 2: O(m)
        start = System.nanoTime();
        int product = 1;
        for (int i = 1; i <= m; i++) {
            product *= i; // overflow not an issue for demo
        }
        end = System.nanoTime();
        System.out.println("Loop 2 (m=" + m + ") took " + (end - start) + " ns");

        // If n and m are the same (e.g., both refer to same array size), O(2n) = O(n).
        System.out.println("\nIf n = m, then O(n) + O(n) = O(n) (since 2 is constant).");
    }
}