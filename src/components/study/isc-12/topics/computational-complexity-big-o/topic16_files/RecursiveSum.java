/**
 * Recursive function to sum numbers from 1 to n.
 * Recurrence: T(n) = T(n-1) + O(1), T(1) = O(1)
 * Time: O(n), Space: O(n) (recursion stack depth = n)
 */
public class RecursiveSum {
    public static void main(String[] args) {
        int n = 10;
        int result = sum(n);
        System.out.println("Sum of 1.." + n + " = " + result);

        // Show call count and depth
        System.out.println("Number of calls: " + n);
        System.out.println("Recursion depth: " + n);
        System.out.println("Time: O(n), Space: O(n)");
    }

    public static int sum(int n) {
        // Base case
        if (n == 1) return 1;

        // Recursive case: T(n) = T(n-1) + O(1)
        return n + sum(n - 1);
    }
}