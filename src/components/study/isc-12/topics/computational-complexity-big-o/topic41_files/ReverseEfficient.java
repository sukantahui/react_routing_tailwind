/**
 * Efficient Recursive String Reversal (in-place swap using char array)
 * Recurrence: T(n) = T(n-2) + O(1), T(0)=T(1)=O(1)
 * Time Complexity: O(n)
 * Space Complexity: O(n) — recursion stack depth = n/2
 * 
 * This version is efficient and avoids creating new strings at each step.
 */
public class ReverseEfficient {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        String str = "hello world";
        System.out.println("Efficient Recursive Reversal");
        System.out.println("Original: \"" + str + "\"");
        callCount = 0;
        maxDepth = 0;
        String reversed = reverse(str);
        System.out.println("Reversed: \"" + reversed + "\"");
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(n)");

        // Show steps for different lengths
        System.out.println("\nSteps for different string lengths:");
        for (int n = 1; n <= 10; n++) {
            String s = "a".repeat(n);
            callCount = 0;
            maxDepth = 0;
            reverse(s);
            System.out.println("n=" + n + " → " + callCount + " calls, depth=" + maxDepth);
        }
        System.out.println("Depth = n/2, so space is O(n).");
    }

    public static String reverse(String s) {
        if (s == null) return null;
        char[] arr = s.toCharArray();
        depth = 0;
        reverseHelper(arr, 0, arr.length - 1);
        return new String(arr);
    }

    private static void reverseHelper(char[] arr, int left, int right) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        // Base case: if left >= right, done
        if (left >= right) {
            depth--;
            return;
        }

        // Swap characters
        char temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        // Recursively reverse the middle
        reverseHelper(arr, left + 1, right - 1);
        depth--;
    }

    private static int depth = 0;
}