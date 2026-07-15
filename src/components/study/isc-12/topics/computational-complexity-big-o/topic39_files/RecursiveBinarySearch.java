/**
 * Recursive Binary Search
 * Recurrence: T(n) = T(n/2) + O(1), T(1) = O(1)
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) — recursion stack depth = log₂(n)
 */
public class RecursiveBinarySearch {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31};
        int target = 17;

        callCount = 0;
        maxDepth = 0;
        int index = binarySearch(arr, target, 0, arr.length - 1);

        System.out.println("Recursive Binary Search");
        System.out.println("Array size: " + arr.length);
        System.out.println("Target: " + target);
        if (index != -1) {
            System.out.println("Found at index " + index);
        } else {
            System.out.println("Not found.");
        }
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Expected depth: " + (int)(Math.log(arr.length) / Math.log(2)) + 1);
        System.out.println("Time: O(log n), Space: O(log n)");

        // Show depth for different array sizes
        System.out.println("\nRecursion depth for different array sizes:");
        for (int n : new int[]{2, 4, 8, 16, 32, 64, 128, 256, 512, 1024}) {
            int[] testArr = new int[n];
            for (int i = 0; i < n; i++) testArr[i] = i;
            callCount = 0;
            maxDepth = 0;
            binarySearch(testArr, n - 1, 0, n - 1);
            System.out.println("n=" + n + " → depth=" + maxDepth + " (log₂(n)=" + (int)(Math.log(n)/Math.log(2)) + ")");
        }
        System.out.println("Depth = log₂(n) + 1, so space is O(log n).");
    }

    public static int binarySearch(int[] arr, int target, int low, int high) {
        callCount++;
        int currentDepth = depth + 1;
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Base case: element not found
        if (low > high) {
            depth--;
            return -1;
        }

        // Safe mid calculation (avoid overflow)
        int mid = low + (high - low) / 2;

        // Base case: found
        if (arr[mid] == target) {
            depth--;
            return mid;
        }

        // Recursive cases
        int result;
        if (arr[mid] < target) {
            result = binarySearch(arr, target, mid + 1, high);
        } else {
            result = binarySearch(arr, target, low, mid - 1);
        }
        depth--;
        return result;
    }

    private static int depth = 0;
}