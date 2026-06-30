/**
 * Demonstrates binary search, a classic O(log n) algorithm.
 * Each step halves the search range.
 */
public class BinarySearchDemo {
    public static void main(String[] args) {
        int[] sortedArray = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31};
        int target = 19;

        int result = binarySearch(sortedArray, target);
        if (result != -1) {
            System.out.println("Target " + target + " found at index " + result);
        } else {
            System.out.println("Target " + target + " not found.");
        }

        // Also demonstrate steps count
        int n = 1_000_000;
        int steps = (int)(Math.log(n) / Math.log(2));
        System.out.println("For n = " + n + ", binary search takes at most " + steps + " comparisons.");
    }

    // Binary search - O(log n)
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        int steps = 0;

        while (low <= high) {
            steps++;
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                System.out.println("Found in " + steps + " steps.");
                return mid;
            }
            if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        System.out.println("Not found after " + steps + " steps.");
        return -1;
    }
}