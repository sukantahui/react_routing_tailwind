/**
 * Recursive Sum of Digits
 * Recurrence: T(n) = T(n/10) + O(1), T(0) = O(1)
 * Time Complexity: O(log n) — number of digits = ⌊log₁₀(n)⌋ + 1
 * Space Complexity: O(log n) — recursion stack depth = number of digits
 */
public class RecursiveSumDigits {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 5432;

        callCount = 0;
        maxDepth = 0;
        int result = sumDigits(n);

        System.out.println("Recursive Sum of Digits");
        System.out.println("n = " + n);
        System.out.println("Sum of digits: " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Number of digits in " + n + ": " + (int)(Math.log10(n) + 1));
        System.out.println("Time: O(log n), Space: O(log n)");

        // Show for different sizes
        System.out.println("\nComparison of steps vs n:");
        int[] nums = {10, 100, 1000, 10000, 100000, 1000000};
        for (int num : nums) {
            callCount = 0;
            maxDepth = 0;
            sumDigits(num);
            System.out.println("n = " + num + " (" + (int)(Math.log10(num) + 1) + " digits) → " + callCount + " calls");
        }
        System.out.println("Notice how steps grow logarithmically, not linearly!");
    }

    public static int sumDigits(int n) {
        callCount++;
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Base case
        if (n == 0) {
            depth--;
            return 0;
        }

        // Recursive case: T(n) = T(n/10) + O(1)
        int lastDigit = n % 10;
        int result = lastDigit + sumDigits(n / 10);
        depth--;
        return result;
    }

    private static int depth = 0;
}