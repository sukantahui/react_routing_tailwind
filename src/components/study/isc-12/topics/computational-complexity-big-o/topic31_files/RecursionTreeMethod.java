/**
 * Demonstrates the recursion tree method for solving recurrences.
 * Draws the tree structure and sums work at each level.
 */
public class RecursionTreeMethod {
    public static void main(String[] args) {
        System.out.println("=== Recursion Tree Method ===\n");

        // Example 1: T(n) = 2T(n/2) + n
        System.out.println("Example 1: T(n) = 2T(n/2) + n");
        System.out.println("  Level 0: 1 node, work = n");
        System.out.println("  Level 1: 2 nodes, each work = n/2, total = n");
        System.out.println("  Level 2: 4 nodes, each work = n/4, total = n");
        System.out.println("  ...");
        System.out.println("  Level k: 2^k nodes, each work = n/2^k, total = n");
        System.out.println("  Height = log₂(n)");
        System.out.println("  Total work = n · (log₂(n) + 1) = O(n log n)\n");

        // Example 2: T(n) = 2T(n/2) + 1
        System.out.println("Example 2: T(n) = 2T(n/2) + 1");
        System.out.println("  Level 0: 1 node, work = 1");
        System.out.println("  Level 1: 2 nodes, each work = 1, total = 2");
        System.out.println("  Level 2: 4 nodes, each work = 1, total = 4");
        System.out.println("  ...");
        System.out.println("  Level k: 2^k nodes, total = 2^k");
        System.out.println("  Height = log₂(n)");
        System.out.println("  Total work = 1 + 2 + 4 + ... + n = O(n)\n");

        // Example 3: T(n) = T(n/2) + 1
        System.out.println("Example 3: T(n) = T(n/2) + 1");
        System.out.println("  Level 0: 1 node, work = 1");
        System.out.println("  Level 1: 1 node, work = 1");
        System.out.println("  Level 2: 1 node, work = 1");
        System.out.println("  ...");
        System.out.println("  Height = log₂(n)");
        System.out.println("  Total work = log₂(n) + 1 = O(log n)\n");

        // Example 4: T(n) = 4T(n/2) + n
        System.out.println("Example 4: T(n) = 4T(n/2) + n");
        System.out.println("  Level 0: 1 node, work = n");
        System.out.println("  Level 1: 4 nodes, each work = n/2, total = 2n");
        System.out.println("  Level 2: 16 nodes, each work = n/4, total = 4n");
        System.out.println("  ...");
        System.out.println("  Level k: 4^k nodes, each work = n/2^k, total = 2^k · n");
        System.out.println("  Height = log₂(n)");
        System.out.println("  Work at level k = n · 2^k");
        System.out.println("  Dominated by last level: n · n = n²");
        System.out.println("  Total work = O(n²)\n");

        // Example 5: T(n) = T(n-1) + n
        System.out.println("Example 5: T(n) = T(n-1) + n");
        System.out.println("  This is a linear recursion tree (chain)");
        System.out.println("  Level 0: n");
        System.out.println("  Level 1: n-1");
        System.out.println("  Level 2: n-2");
        System.out.println("  ...");
        System.out.println("  Level n: 1");
        System.out.println("  Total work = n + (n-1) + ... + 1 = n(n+1)/2 = O(n²)\n");
    }
}