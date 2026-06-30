/**
 * Demonstrates Big-Ω complexities with code snippets.
 * Shows the best-case analysis.
 */
public class BigOmegaDemo {
    public static void main(String[] args) {
        int n = 100;

        // Ω(1) - Constant lower bound (best case constant)
        System.out.println("Ω(1): Array access — always constant time, even in best case");
        int[] arr = new int[n];
        int x = arr[0]; // Ω(1) as well as O(1)

        // Ω(n) - Linear lower bound (must at least scan n elements in some problems)
        System.out.println("Ω(n): Finding if all elements are positive (must check all)");
        boolean allPositive = true;
        for (int i = 0; i < n; i++) {
            if (arr[i] < 0) {
                allPositive = false;
                break;
            }
        }
        // In the best case, we might break early (if negative found early),
        // but if the input is all positive, we must scan all n, so Ω(n).

        // Ω(log n) - Logarithmic lower bound (e.g., balanced tree search)
        System.out.println("Ω(log n): Binary search in worst case is O(log n), but best case is O(1), so Ω(1) not Ω(log n)");
        // Actually binary search has Ω(1) because the target could be at the middle.
        // A better example: any algorithm that must examine at least log n elements in the best case.
        // Not easy to show here.

        // More practical: some problems have inherent lower bound Ω(n) because you must read input.
        System.out.println("Any algorithm that processes all n elements has Ω(n) (because it must read them).");
    }
}