/**
 * Binary Search — O(log n) time.
 * Each step halves the search space.
 */
public class BinarySearch {
    public static void main(String[] args) {
        int[] sortedArray = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31};
        int target = 17;

        System.out.println("Binary Search (O(log n))");
        System.out.println("Array size: " + sortedArray.length);
        System.out.println("Target: " + target);

        int index = binarySearch(sortedArray, target);
        if (index != -1) {
            System.out.println("Found at index " + index);
        } else {
            System.out.println("Not found");
        }

        // Show steps for different n
        System.out.println("\nSteps comparison:");
        for (int n : new int[]{10, 100, 1000, 10000, 100000, 1000000, 10000000}) {
            int steps = (int)(Math.log(n) / Math.log(2)) + 1;
            System.out.println("n=" + n + " → " + steps + " steps");
        }
    }

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