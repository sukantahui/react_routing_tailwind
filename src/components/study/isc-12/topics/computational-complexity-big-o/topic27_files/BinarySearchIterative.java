/**
 * Binary Search — Iterative Implementation
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
public class BinarySearchIterative {
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21};
        int target = 13;

        System.out.println("Array: " + java.util.Arrays.toString(arr));
        System.out.println("Searching for: " + target);

        int index = binarySearch(arr, target);

        if (index != -1) {
            System.out.println("Found at index " + index);
        } else {
            System.out.println("Not found.");
        }

        // Show steps for different targets
        System.out.println("\nSearching for different targets:");
        for (int t : new int[]{1, 11, 21, 25}) {
            int idx = binarySearchWithSteps(arr, t);
            System.out.println("Target " + t + " found at index " + idx);
        }
    }

    // Iterative binary search with overflow-safe mid calculation
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            // Avoid overflow: low + (high - low) / 2
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    // Version that counts steps
    public static int binarySearchWithSteps(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        int steps = 0;

        while (low <= high) {
            steps++;
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                System.out.println("  Found in " + steps + " steps.");
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        System.out.println("  Not found after " + steps + " steps.");
        return -1;
    }
}