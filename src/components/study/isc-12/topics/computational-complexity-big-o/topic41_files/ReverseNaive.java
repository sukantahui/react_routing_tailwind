/**
 * Naive Recursive String Reversal
 * Recurrence: T(n) = T(n-1) + O(n) (substring + concat)
 * Time Complexity: O(n²)
 * Space Complexity: O(n) (recursion stack) + O(n²) string allocations
 * 
 * This version is simple but inefficient for large strings.
 */
public class ReverseNaive {
    private static int callCount = 0;

    public static void main(String[] args) {
        String str = "hello";
        System.out.println("Naive Recursive Reversal");
        System.out.println("Original: \"" + str + "\"");
        callCount = 0;
        String reversed = reverse(str);
        System.out.println("Reversed: \"" + reversed + "\"");
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Time: O(n²), Space: O(n) stack + O(n²) string allocations");

        // Show complexity for growing n (only small n to keep time reasonable)
        System.out.println("\nSteps for different string lengths:");
        for (int n = 1; n <= 6; n++) {
            String s = "a".repeat(n);
            callCount = 0;
            reverse(s);
            System.out.println("n=" + n + " → " + callCount + " calls");
        }
        System.out.println("Note: Each call creates a new string (substring + concat), causing O(n²) character copies.");
    }

    // Naive recursive reverse
    public static String reverse(String s) {
        callCount++;
        // Base case
        if (s.length() <= 1) {
            return s;
        }
        // Recursive case: reverse substring and append first char
        // substring creates a new string (O(n)), concat creates another (O(n))
        return reverse(s.substring(1)) + s.charAt(0);
    }
}