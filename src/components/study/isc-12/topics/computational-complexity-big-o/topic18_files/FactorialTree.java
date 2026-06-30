/**
 * Traces the recursion tree for factorial.
 * Recurrence: T(n) = T(n-1) + O(1), T(0)=O(1)
 * Tree: Chain of n nodes, each with O(1) work.
 * Total: O(n)
 */
public class FactorialTree {
    private static int depth = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 5;
        System.out.println("=== Factorial Recursion Tree ===");
        System.out.println("n = " + n);
        System.out.println("Tree structure: linear chain of " + (n+1) + " nodes");
        System.out.println("Each node does O(1) work");
        System.out.println("Total: O(n)");

        System.out.println("\nTracing calls:");
        factorial(n);
        System.out.println("Maximum depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(n)");
    }

    public static int factorial(int n) {
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        // Indent to show depth
        String indent = "  ".repeat(depth - 1);
        System.out.println(indent + "factorial(" + n + ")");

        if (n <= 1) {
            depth--;
            return 1;
        }

        int result = n * factorial(n - 1);
        depth--;
        return result;
    }
}