/**
 * Traces the recursion tree for binary search.
 * Recurrence: T(n) = T(n/2) + O(1), T(1)=O(1)
 * Tree: One branch per level, height = log₂(n).
 * Total: O(log n)
 */
public class BinarySearchTree {
    private static int depth = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31};
        int target = 17;
        int n = arr.length;

        System.out.println("=== Binary Search Recursion Tree ===");
        System.out.println("n = " + n);
        System.out.println("Tree structure: single path of length log₂(n) = " + (int)(Math.log(n)/Math.log(2)));
        System.out.println("Each node does O(1) work");
        System.out.println("Total: O(log n)");

        System.out.println("\nTracing calls:");
        binarySearch(arr, target, 0, arr.length - 1);
        System.out.println("Maximum depth: " + maxDepth);
        System.out.println("Time: O(log n), Space: O(log n)");
    }

    public static int binarySearch(int[] arr, int target, int low, int high) {
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        String indent = "  ".repeat(depth - 1);
        System.out.println(indent + "search(" + low + ", " + high + ")");

        if (low > high) {
            depth--;
            return -1;
        }

        int mid = low + (high - low) / 2;
        System.out.println(indent + "  mid=" + mid + ", arr[mid]=" + arr[mid]);

        if (arr[mid] == target) {
            depth--;
            return mid;
        }

        int result;
        if (arr[mid] < target) {
            result = binarySearch(arr, target, mid + 1, high);
        } else {
            result = binarySearch(arr, target, low, mid - 1);
        }
        depth--;
        return result;
    }
}