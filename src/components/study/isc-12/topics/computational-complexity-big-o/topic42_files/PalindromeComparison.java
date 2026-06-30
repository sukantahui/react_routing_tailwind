/**
 * Compares different palindrome checking approaches:
 * 1. Recursive (compare ends) — O(n) time, O(n) space
 * 2. Iterative (two pointers) — O(n) time, O(1) space
 * 3. Reverse & Compare — O(n) time, O(n) space
 */
public class PalindromeComparison {
    public static void main(String[] args) {
        String s = "racecar";
        // For timing, use a longer string
        String longS = "a".repeat(10000) + "b" + "a".repeat(10000);

        System.out.println("=== Palindrome Comparison ===");
        System.out.println("String: \"" + s + "\"");
        System.out.println();

        // 1. Recursive
        long start = System.nanoTime();
        boolean recResult = RecursivePalindrome.isPalindrome(s);
        long end = System.nanoTime();
        System.out.println("1. Recursive (ends): " + recResult);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(n), Space: O(n)");

        // 2. Iterative
        start = System.nanoTime();
        boolean iterResult = iterativePalindrome(s);
        end = System.nanoTime();
        System.out.println("2. Iterative (two pointers): " + iterResult);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(n), Space: O(1)");

        // 3. Reverse & Compare
        start = System.nanoTime();
        boolean revResult = reverseComparePalindrome(s);
        end = System.nanoTime();
        System.out.println("3. Reverse & Compare: " + revResult);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(n), Space: O(n)");

        // All results should match
        System.out.println("\nAll methods give the same result: " +
            (recResult == iterResult && iterResult == revResult));

        // Long string comparison
        System.out.println("\n=== Long String Test (n=20001) ===");
        start = System.nanoTime();
        RecursivePalindrome.isPalindrome(longS);
        end = System.nanoTime();
        System.out.println("Recursive: " + (end - start) + " ns");

        start = System.nanoTime();
        iterativePalindrome(longS);
        end = System.nanoTime();
        System.out.println("Iterative: " + (end - start) + " ns");

        start = System.nanoTime();
        reverseComparePalindrome(longS);
        end = System.nanoTime();
        System.out.println("Reverse & Compare: " + (end - start) + " ns");

        System.out.println("\nIterative is fastest (O(1) space, no recursion overhead).");
        System.out.println("Recursive and Reverse are both O(n) but have different constants.");
    }

    // Iterative two-pointer: O(n) time, O(1) space
    public static boolean iterativePalindrome(String s) {
        if (s == null) return false;
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // Reverse & Compare: O(n) time, O(n) space
    public static boolean reverseComparePalindrome(String s) {
        if (s == null) return false;
        String reversed = new StringBuilder(s).reverse().toString();
        return s.equals(reversed);
    }
}