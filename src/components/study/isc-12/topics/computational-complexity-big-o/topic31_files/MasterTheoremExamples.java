/**
 * Applies the Master Theorem to common recursive algorithms.
 * For T(n) = a·T(n/b) + f(n):
 * - Case 1: f(n) = O(n^(log_b a - ε)) → T(n) = Θ(n^(log_b a))
 * - Case 2: f(n) = Θ(n^(log_b a)) → T(n) = Θ(n^(log_b a)·log n)
 * - Case 3: f(n) = Ω(n^(log_b a + ε)) → T(n) = Θ(f(n))
 */
public class MasterTheoremExamples {
    public static void main(String[] args) {
        System.out.println("=== Master Theorem Examples ===\n");

        // Example 1: Merge Sort
        System.out.println("Example 1: Merge Sort");
        System.out.println("  T(n) = 2T(n/2) + O(n)");
        System.out.println("  a=2, b=2, log_b a = log₂(2) = 1");
        System.out.println("  f(n) = n = Θ(n^1) → Case 2");
        System.out.println("  Solution: T(n) = Θ(n · log n)");
        System.out.println("  Time: O(n log n)\n");

        // Example 2: Binary Search
        System.out.println("Example 2: Binary Search");
        System.out.println("  T(n) = T(n/2) + O(1)");
        System.out.println("  a=1, b=2, log_b a = log₂(1) = 0");
        System.out.println("  f(n) = 1 = Θ(n^0) → Case 2");
        System.out.println("  Solution: T(n) = Θ(log n)");
        System.out.println("  Time: O(log n)\n");

        // Example 3: Tree Traversal (constant work per level)
        System.out.println("Example 3: Tree Traversal (constant work)");
        System.out.println("  T(n) = 2T(n/2) + O(1)");
        System.out.println("  a=2, b=2, log_b a = log₂(2) = 1");
        System.out.println("  f(n) = 1 = O(n^(1-ε)) → Case 1");
        System.out.println("  Solution: T(n) = Θ(n)");
        System.out.println("  Time: O(n)\n");

        // Example 4: Divide & Conquer Max
        System.out.println("Example 4: Divide & Conquer Max");
        System.out.println("  T(n) = 2T(n/2) + O(1)");
        System.out.println("  a=2, b=2, log_b a = log₂(2) = 1");
        System.out.println("  f(n) = 1 = O(n^(1-ε)) → Case 1");
        System.out.println("  Solution: T(n) = Θ(n)");
        System.out.println("  Time: O(n)\n");

        // Example 5: 3-way Merge Sort
        System.out.println("Example 5: 3-way Merge Sort");
        System.out.println("  T(n) = 3T(n/3) + O(n)");
        System.out.println("  a=3, b=3, log_b a = log₃(3) = 1");
        System.out.println("  f(n) = n = Θ(n^1) → Case 2");
        System.out.println("  Solution: T(n) = Θ(n · log n)");
        System.out.println("  Time: O(n log n)\n");

        // Example 6: Strassen's Matrix Multiplication
        System.out.println("Example 6: Strassen's Matrix Multiplication");
        System.out.println("  T(n) = 7T(n/2) + O(n²)");
        System.out.println("  a=7, b=2, log_b a = log₂(7) ≈ 2.807");
        System.out.println("  f(n) = n² = O(n^(2.807 - ε)) → Case 1");
        System.out.println("  Solution: T(n) = Θ(n^(log₂(7))) ≈ Θ(n^2.807)");
        System.out.println("  Time: O(n^2.807) (better than O(n³))\n");

        // Example 7: Cholesky Decomposition (special case)
        System.out.println("Example 7: Cholesky Decomposition");
        System.out.println("  T(n) = T(n/2) + O(n²)");
        System.out.println("  a=1, b=2, log_b a = log₂(1) = 0");
        System.out.println("  f(n) = n² = Ω(n^(0+ε)) → Case 3");
        System.out.println("  Need to check regularity condition: a·f(n/b) ≤ c·f(n)");
        System.out.println("  Solution: T(n) = Θ(n²)");
        System.out.println("  Time: O(n²)\n");
    }
}