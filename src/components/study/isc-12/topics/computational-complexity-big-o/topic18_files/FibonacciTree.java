/**
 * Traces the recursion tree for naive Fibonacci.
 * Recurrence: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)
 * Tree: Exponential branching, height = n, each level has 2ᵏ nodes.
 * Total: O(2ⁿ)
 */
public class FibonacciTree {
    private static int depth = 0;
    private static int maxDepth = 0;
    private static int callCount = 0;

    public static void main(String[] args) {
        int n = 5;
        callCount = 0;
        maxDepth = 0;
        depth = 0;

        System.out.println("=== Fibonacci Recursion Tree ===");
        System.out.println("n = " + n);
        System.out.println("Tree structure: exponential with overlapping subproblems");
        System.out.println("Height = " + n);
        System.out.println("Number of nodes: O(2ⁿ)");

        System.out.println("\nTracing calls:");
        int result = fib(n);
        System.out.println("fib(" + n + ") = " + result);
        System.out.println("Total recursive calls: " + callCount);
        System.out.println("Maximum depth: " + maxDepth);
        System.out.println("Time: O(2ⁿ), Space: O(n)");

        // Show the explosion in calls
        System.out.println("\nCall counts for different n:");
        for (int i = 1; i <= 10; i++) {
            callCount = 0;
            fib(i);
            System.out.println("fib(" + i + ") calls: " + callCount);
        }
    }

    public static int fib(int n) {
        depth++;
        callCount++;
        if (depth > maxDepth) maxDepth = depth;

        String indent = "  ".repeat(depth - 1);
        System.out.println(indent + "fib(" + n + ")");

        if (n <= 1) {
            depth--;
            return n;
        }

        int result = fib(n - 1) + fib(n - 2);
        depth--;
        return result;
    }
}