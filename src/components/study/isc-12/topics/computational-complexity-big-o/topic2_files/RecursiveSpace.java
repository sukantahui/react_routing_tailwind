/**
 * Demonstrates O(n) space due to recursion stack.
 * The call stack depth is proportional to n.
 */
public class RecursiveSpace {
    public static void main(String[] args) {
        int n = 5;
        System.out.println("Sum of 1.." + n + " recursively = " + sumRecursive(n));
        System.out.println("Maximum recursion depth: " + n + " calls -> O(n) space.");
    }

    // Recursive function: each call adds a frame to the stack.
    public static int sumRecursive(int n) {
        if (n == 0) return 0;           // Base case
        int partial = sumRecursive(n - 1); // Recursive call
        return partial + n;             // O(1) work per call
    }
}