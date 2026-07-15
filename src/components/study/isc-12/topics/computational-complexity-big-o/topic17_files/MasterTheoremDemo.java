/**
 * Demonstrates the Master Theorem for solving recurrences
 * of the form: T(n) = a·T(n/b) + f(n).
 */
public class MasterTheoremDemo {
    public static void main(String[] args) {
        System.out.println("=== Master Theorem ===\n");
        System.out.println("For T(n) = a·T(n/b) + f(n):");
        System.out.println("  - Compare f(n) with n^(log_b a)");
        System.out.println("  - Case 1: f(n) = O(n^(log_b a - ε)) → T(n) = Θ(n^(log_b a))");
        System.out.println("  - Case 2: f(n) = Θ(n^(log_b a)) → T(n) = Θ(n^(log_b a) · log n)");
        System.out.println("  - Case 3: f(n) = Ω(n^(log_b a + ε)) → T(n) = Θ(f(n))\n");

        // Example 1: Merge Sort: T(n) = 2T(n/2) + O(n)
        System.out.println("Example 1: T(n) = 2T(n/2) + n");
        System.out.println("  a=2, b=2, log_b a = log₂(2) = 1");
        System.out.println("  f(n) = n = Θ(n^1) → Case 2");
        System.out.println("  T(n) = Θ(n · log n) = O(n log n)\n");

        // Example 2: Binary Search: T(n) = T(n/2) + O(1)
        System.out.println("Example 2: T(n) = T(n/2) + 1");
        System.out.println("  a=1, b=2, log_b a = log₂(1) = 0");
        System.out.println("  f(n) = 1 = Θ(n^0) → Case 2");
        System.out.println("  T(n) = Θ(log n) = O(log n)\n");

        // Example 3: Tree Traversal: T(n) = 2T(n/2) + O(1)
        System.out.println("Example 3: T(n) = 2T(n/2) + 1");
        System.out.println("  a=2, b=2, log_b a = log₂(2) = 1");
        System.out.println("  f(n) = 1 = O(n^1) but not polynomial?");
        System.out.println("  Actually f(n)=O(n^(log_b a - ε)) with ε=0.5?");
        System.out.println("  For f(n)=1, f(n)=O(n^0) but log_b a=1, so 0 < 1-ε?");
        System.out.println("  Since 1 = O(n^(1-ε)) for ε<1, Case 1 applies");
        System.out.println("  T(n) = Θ(n^(log_b a)) = Θ(n)\n");

        // Example 4: Divide and Conquer Max: T(n) = 2T(n/2) + O(1)
        System.out.println("Example 4: T(n) = 2T(n/2) + 1");
        System.out.println("  a=2, b=2, log_b a = 1");
        System.out.println("  f(n) = 1 = O(n^(1-ε)) → Case 1");
        System.out.println("  T(n) = Θ(n) = O(n)");
    }
}