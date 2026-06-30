/**
 * Demonstrates solving recurrences using the iteration (expansion) method.
 */
public class SolvingRecurrences {
    public static void main(String[] args) {
        System.out.println("=== Solving Recurrences ===\n");

        // Example 1: T(n) = T(n-1) + 1, T(0) = 1
        System.out.println("Example 1: T(n) = T(n-1) + 1, T(0) = 1");
        System.out.println("  Expand: T(n) = T(n-1) + 1");
        System.out.println("         = T(n-2) + 1 + 1");
        System.out.println("         = T(n-3) + 3");
        System.out.println("         ...");
        System.out.println("         = T(0) + n = 1 + n");
        System.out.println("  Solution: T(n) = O(n)");

        // Example 2: T(n) = 2T(n/2) + n, T(1) = 1
        System.out.println("\nExample 2: T(n) = 2T(n/2) + n, T(1) = 1");
        System.out.println("  Level 0: n work, 1 node");
        System.out.println("  Level 1: n/2 + n/2 = n work, 2 nodes");
        System.out.println("  Level 2: n/4 + n/4 + n/4 + n/4 = n work, 4 nodes");
        System.out.println("  ...");
        System.out.println("  Level log₂(n): n work, n nodes");
        System.out.println("  Total work = n * (log₂(n) + 1) = O(n log n)");

        // Example 3: T(n) = T(n/2) + 1, T(1) = 1
        System.out.println("\nExample 3: T(n) = T(n/2) + 1, T(1) = 1");
        System.out.println("  Expand: T(n) = T(n/2) + 1");
        System.out.println("         = T(n/4) + 1 + 1");
        System.out.println("         = T(n/8) + 3");
        System.out.println("         ...");
        System.out.println("         = T(1) + log₂(n) = 1 + log₂(n)");
        System.out.println("  Solution: T(n) = O(log n)");
    }
}