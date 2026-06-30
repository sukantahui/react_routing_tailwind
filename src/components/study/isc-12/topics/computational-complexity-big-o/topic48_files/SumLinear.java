/**
 * Linear Recursion: Sum of 1..n
 * Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)
 * Time Complexity: O(n)
 * Space Complexity: O(n) — recursion stack depth = n
 */
public class SumLinear {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 10;

        callCount = 0;
        maxDepth = 0;
        int result = sum(n);

        System.out.println("Linear Recursion: Sum of 1.." + n);
        System.out.println("Sum = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(n)");
        System.out.println("Expected sum: " + n * (n + 1) / 2);

        // Show call counts
        System.out.println("\nCall counts for different n:");
        for (int i = 1; i <= 10; i++) {
            callCount = 0;
            maxDepth = 0;
            sum(i);
            System.out.println("sum(" + i + ") → " + callCount + " calls, depth=" + maxDepth);
        }
        System.out.println("Depth = n, so space is O(n).");
        System.out.println("The iterative version would use O(1) space.");
    }

    public static int sum(int n) {
        callCount++;
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