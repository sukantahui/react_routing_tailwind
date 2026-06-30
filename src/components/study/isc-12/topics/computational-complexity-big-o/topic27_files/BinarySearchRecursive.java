/**
 * Binary Search — Recursive Implementation
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to recursion stack
 */
public class BinarySearchRecursive {
    private static int callCount = 0;

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21};
        int target = 13;

        System.out.println("Array: " + java.util.Arrays.toString(arr));
        System.out.println("Searching for: " + target);

        callCount = 0;
        int index = binarySearch(arr, target, 0, arr.length - 1);

        if (index != -1) {
            System.out.println("Found at index " + index);
        } else {
            System.out.println("Not found.");
        }
        System.out.println("Number of recursive calls: " + callCount);

        // Show recursion depth
        System.out.println("\nRecursion depth for n=" + arr.length + ": " + (int)(Math.log(arr.length) / Math.log(2)) + " levels");
        System.out.println("Space complexity: O(log n) due to stack.");
    }

    public static int binarySearch(int[] arr, int target, int low, int high) {
        callCount++;

        // Base case: element not found
        if (low > high) {
            return -1;
        }

        int mid = low + (high - low) / 2;

        // Base case: found
        if (arr[mid] == target) {
            return mid;
        }

        // Recursive cases
        if (arr[mid] < target) {
            return binarySearch(arr, target, mid + 1, high);
        } else {
            return binarySearch(arr, target, low, mid - 1);
        }
    }
}