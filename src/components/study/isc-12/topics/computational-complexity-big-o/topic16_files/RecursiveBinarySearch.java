/**
 * Recursive binary search.
 * Recurrence: T(n) = T(n/2) + O(1), T(1) = O(1)
 * Time: O(log n), Space: O(log n) (recursion stack depth = log n)
 */
public class RecursiveBinarySearch {
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21};
        int target = 13;

        int index = binarySearch(arr, target, 0, arr.length - 1);

        if (index != -1) {
            System.out.println("Target " + target + " found at index " + index);
        } else {
            System.out.println("Target " + target + " not found.");
        }

        // Show depth for n = 11
        int n = 11;
        int depth = (int)(Math.log(n) / Math.log(2)) + 1;
        System.out.println("Recursion depth for n=" + n + ": " + depth);
        System.out.println("Time: O(log n), Space: O(log n)");
    }

    public static int binarySearch(int[] arr, int target, int low, int high) {
        // Base case: element not found
        if (low > high) return -1;

        int mid = low + (high - low) / 2;

        // Base case: found
        if (arr[mid] == target) return mid;

        // Recursive cases: T(n) = T(n/2) + O(1)
        if (arr[mid] < target) {
            return binarySearch(arr, target, mid + 1, high);
        } else {
            return binarySearch(arr, target, low, mid - 1);
        }
    }
}