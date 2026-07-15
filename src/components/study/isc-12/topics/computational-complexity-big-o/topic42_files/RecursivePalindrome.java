/**
 * Recursive Palindrome Check (Efficient)
 * Recurrence: T(n) = T(n-2) + O(1), T(0)=T(1)=O(1)
 * Time Complexity: O(n) — n/2 comparisons
 * Space Complexity: O(n) — recursion stack depth = n/2
 * 
 * This version uses character array and indices to avoid string creation.
 */
public class RecursivePalindrome {
    private static int comparisons = 0;
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        String[] testStrings = {
            "racecar",
            "madam",
            "hello",
            "a",
            "",
            "A man a plan a canal Panama",
            "race a car"
        };

        System.out.println("=== Recursive Palindrome Check ===");
        for (String s : testStrings) {
            comparisons = 0;
            callCount = 0;
            maxDepth = 0;
            // For case-insensitive and ignoring spaces, we'd normalize,
            // but we'll keep it simple for demonstration.
            String clean = s.replaceAll("[^a-zA-Z]", "").toLowerCase();
            boolean result = isPalindrome(clean);
            System.out.println("\"" + s + "\" → " + result);
            System.out.println("  Comparisons: " + comparisons + " (n/2 = " + clean.length()/2 + ")");
            System.out.println("  Calls: " + callCount + ", Depth: " + maxDepth);
        }

        System.out.println("\nTime: O(n), Space: O(n) (stack depth = n/2)");
    }

    public static boolean isPalindrome(String s) {
        if (s == null) return false;
        // Remove non-alphanumeric and convert to lowercase for real palindrome checks
        // but we'll keep it simple
        char[] arr = s.toCharArray();
        depth = 0;
        comparisons = 0;
        callCount = 0;
        maxDepth = 0;
        return isPalindromeHelper(arr, 0, arr.length - 1);
    }

    private static boolean isPalindromeHelper(char[] arr, int left, int right) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        // Base case: if left >= right, it's a palindrome
        if (left >= right) {
            depth--;
            return true;
        }

        // Compare characters
        comparisons++;
        if (arr[left] != arr[right]) {
            depth--;
            return false;
        }

        // Recursively check the middle
        boolean result = isPalindromeHelper(arr, left + 1, right - 1);
        depth--;
        return result;
    }

    private static int depth = 0;
}