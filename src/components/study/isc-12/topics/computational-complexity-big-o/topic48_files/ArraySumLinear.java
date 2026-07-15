/**
 * Linear Recursion: Sum of Array Elements
 * Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)
 * Time Complexity: O(n)
 * Space Complexity: O(n) — recursion stack depth = n
 */
public class ArraySumLinear {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        callCount = 0;
        maxDepth = 0;
        int result = arraySum(arr, arr.length - 1);

        System.out.println("Linear Recursion: Array Sum");
        System.out.println("Array: " + java.util.Arrays.toString(arr));
        System.out.println("Sum = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(n)");

        // Show for different array sizes
        System.out.println("\nCall counts for different array sizes:");
        for (int n = 1; n <= 10; n++) {
            int[] testArr = new int[n];
            for (int i = 0; i < n; i++) testArr[i] = i + 1;
            callCount = 0;
            maxDepth = 0;
            arraySum(testArr, n - 1);
            System.out.println("n=" + n + " → " + callCount + " calls, depth=" + maxDepth);
        }
        System.out.println("Depth = n, so space is O(n).");
    }

    public static int arraySum(int[] arr, int index) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        // Base case: empty array
        if (index < 0) {
            depth--;
            return 0;
        }

        // Recursive case: T(n) = T(n-1) + O(1)
        int result = arr[index] + arraySum(arr, index - 1);
        depth--;
        return result;
    }

    private static int depth = 0;
}