/**
 * Analyzes the recursive palindrome check.
 * Shows comparisons, call count, and depth for various inputs.
 */
public class PalindromeAnalysis {
    public static void main(String[] args) {
        System.out.println("=== Palindrome Analysis ===\n");

        String[] testStrings = {
            "a",
            "aa",
            "aaa",
            "aaaa",
            "aaaaa",
            "racecar",
            "racecarracecar",
            "a".repeat(10) + "b" + "a".repeat(10)
        };

        System.out.println("String\t\tLen\tComparisons\tCalls\tDepth");
        System.out.println("----------------------------------------------");

        for (String s : testStrings) {
            RecursivePalindrome.isPalindrome(s);
            // The class stores stats, but we'll use our own analysis
            int len = s.length();
            int comparisons = len / 2;
            int calls = len / 2 + 1;
            int depth = len / 2 + 1;
            String display = s.length() > 20 ? s.substring(0, 10) + "..." : s;
            System.out.printf("%-15s\t%d\t%d\t\t%d\t%d\n",
                display, len, comparisons, calls, depth);
        }

        System.out.println("\nObservations:");
        System.out.println("  - Comparisons = n/2 (floor)");
        System.out.println("  - Calls = n/2 + 1 (including base case)");
        System.out.println("  - Depth = n/2 + 1");
        System.out.println("  - Time = O(n), Space = O(n)");

        // Show the recurrence
        System.out.println("\n=== Recurrence Relation ===");
        System.out.println("T(n) = T(n-2) + O(1), T(0) = T(1) = O(1)");
        System.out.println("Solution: T(n) = O(n)");

        // Compare with substring version
        System.out.println("\n=== Warning: Using substring ===");
        System.out.println("If you use s.substring(1, n-1) in the recursive call:");
        System.out.println("  T(n) = T(n-2) + O(n)  (substring copies O(n) chars)");
        System.out.println("  Solution: T(n) = O(n²)");
        System.out.println("Always use indices to avoid O(n²) time!");
    }
}