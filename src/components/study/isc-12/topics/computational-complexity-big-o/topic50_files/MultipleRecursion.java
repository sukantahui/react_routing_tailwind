/**
 * Multiple Recursion: Exponential (a=3)
 * Recurrence: T(n) = 3T(n-1) + O(1), T(0) = O(1)
 * Time Complexity: O(3ⁿ)
 * Space Complexity: O(n) — recursion stack depth = n
 * 
 * This demonstrates multiple recursion with branching factor 3.
 * Each call makes 3 recursive calls on n-1.
 */
public class MultipleRecursion {
    private static long callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 6;

        callCount = 0;
        maxDepth = 0;
        long result = f(n);

        System.out.println("Multiple Recursion (a=3, exponential)");
        System.out.println("f(" + n + ") = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Expected calls for n=" + n + ": 3^" + n + " = " + (int)Math.pow(3, n));
        System.out.println("Time: O(3ⁿ), Space: O(n)");

        // Show the growth
        System.out.println("\nCall counts for different n:");
        for (int i = 1; i <= 8; i++) {
            callCount = 0;
            maxDepth = 0;
            f(i);
            System.out.println("f(" + i + ") → " + callCount + " calls (3^" + i + " = " + (int)Math.pow(3, i) + ")");
        }
        System.out.println("For n=20, 3^20 ≈ 3.4×10⁹ calls — impossible!");
        System.out.println("This is why multiple recursion is exponential.");
        System.out.println("Pruning can reduce the number of calls in practice.");
    }

    // Multiple recursion: 3 calls on n-1
    public static long f(int n) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        // Base case
        if (n <= 1) {
            depth--;
            return n;
        }

        // 3 recursive calls
        long result = f(n - 1) + f(n - 2) + f(n - 3);
        depth--;
        return result;
    }

    private static int depth = 0;
}