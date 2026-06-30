/**
 * Demonstrates combining sequential and nested loops in one method.
 * Complexity: O(n) + O(n²) = O(n²) if the nested part is on the same input.
 */
public class CombinedLoops {
    public static void main(String[] args) {
        int n = 500;

        System.out.println("Combined loops: O(n) + O(n²) = O(n²)");

        long start = System.nanoTime();

        // Sequential part 1: O(n)
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i;
        }

        // Nested part: O(n²)
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }

        // Sequential part 2: O(n) — another linear loop
        int product = 1;
        for (int i = 1; i <= n; i++) {
            product *= i; // overflow ignored
        }

        long end = System.nanoTime();

        System.out.println("Total time: " + (end - start) + " ns");
        System.out.println("The O(n²) part dominates, so total = O(n²).");
        System.out.println("The two O(n) parts add to O(n), which is negligible compared to O(n²).");
    }
}