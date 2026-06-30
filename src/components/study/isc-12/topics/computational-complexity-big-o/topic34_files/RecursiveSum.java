/**
 * Recursive Sum of N Numbers
 * Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)
 * Time Complexity: O(n)
 * Space Complexity: O(n) — due to recursion stack depth = n
 */
public class RecursiveSum {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 10;

        callCount = 0;
        maxDepth = 0;
        int result = sum(n);

        System.out.println("Recursive Sum (1.." + n + ")");
        System.out.println("Result: " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(n)");
        System.out.println("Expected: " + n * (n + 1) / 2);

        // Show stack depth for different n
        System.out.println("\nRecursion depth for different n:");
        for (int i = 1; i <= 10; i++) {
            callCount = 0;
            maxDepth = 0;
            sum(i);
            System.out.println("sum(" + i + ") -> depth = " + maxDepth);
        }
        System.out.println("Depth = n, so space complexity is O(n).");
    }

    public static int sum(int n) {
        callCount++;
        int currentDepth = 0;
        // Track depth
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Base case
        if (n == 0) {
            depth--;
            return 0;
        }

        // Recursive case: T(n) = T(n-1) + O(1)
        int result = n + sum(n - 1);
        depth--;
        return result;
    }

    private static int depth = 0;
}