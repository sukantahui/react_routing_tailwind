/**
 * Recursive factorial function.
 * Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)
 * Time: O(n), Space: O(n) (recursion stack depth = n)
 */
public class RecursiveFactorial {
    public static void main(String[] args) {
        int n = 5;
        long result = factorial(n);
        System.out.println(n + "! = " + result);

        // Show call count and depth
        System.out.println("Number of calls: " + (n + 1));
        System.out.println("Recursion depth: " + n);
        System.out.println("Time: O(n), Space: O(n)");
    }

    public static long factorial(int n) {
        // Base case
        if (n <= 1) return 1;

        // Recursive case: T(n) = T(n-1) + O(1)
        return n * factorial(n - 1);
    }
}