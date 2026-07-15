/**
 * Tail Recursive Sum of N Numbers
 * Recurrence: T(n) = T(n-1) + O(1) (tail-recursive)
 * Time Complexity: O(n)
 * Space Complexity: O(1) with TCO (Tail Call Optimization)
 * Note: Java does not support TCO, but the pattern is important for languages that do.
 */
public class TailRecursiveSum {
    private static int callCount = 0;

    public static void main(String[] args) {
        int n = 10;

        callCount = 0;
        int result = sum(n, 0);

        System.out.println("Tail Recursive Sum (1.." + n + ")");
        System.out.println("Result: " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("With TCO, space would be O(1)");
        System.out.println("In Java, space is O(n) because TCO is not supported.");
        System.out.println("Expected: " + n * (n + 1) / 2);

        // Compare with non-tail recursive version
        System.out.println("\nComparison:");
        System.out.println("Non-tail: depth = n, space = O(n)");
        System.out.println("Tail-recursive: depth = n in Java, but O(1) in languages with TCO.");
        System.out.println("The accumulator pattern is important for functional programming.");
    }

    // Tail-recursive sum with accumulator
    public static int sum(int n, int acc) {
        callCount++;
        // Base case: when n reaches 0, return the accumulator
        if (n == 0) {
            return acc;
        }
        // Tail-recursive call: the last operation is the recursive call
        return sum(n - 1, acc + n);
    }
}