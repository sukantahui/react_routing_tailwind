/**
 * Linear Recursion: Factorial
 * Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)
 * Time Complexity: O(n)
 * Space Complexity: O(n) — recursion stack depth = n
 */
public class FactorialLinear {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 10;

        callCount = 0;
        maxDepth = 0;
        long result = factorial(n);

        System.out.println("Linear Recursion: Factorial");
        System.out.println(n + "! = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(n)");

        // Show call count for different n
        System.out.println("\nCall counts for different n:");
        for (int i = 1; i <= 10; i++) {
            callCount = 0;
            maxDepth = 0;
            factorial(i);
            System.out.println("factorial(" + i + ") → " + callCount + " calls, depth=" + maxDepth);
        }
        System.out.println("Depth = n, so space is O(n).");
        System.out.println("For n=10,000, recursion depth = 10,000 → may cause stack overflow.");
        System.out.println("Consider iteration for large n.");
    }

    public static long factorial(int n) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        // Base case
        if (n <= 1) {
            depth--;
            return 1;
        }

        // Recursive case: T(n) = T(n-1) + O(1)
        long result = n * factorial(n - 1);
        depth--;
        return result;
    }

    private static int depth = 0;
}