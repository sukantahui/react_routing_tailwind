/**
 * Demonstrates the difference between O(n) linear search and O(log n) binary search.
 * Both find a target in a sorted array, but the number of operations differs dramatically.
 */
public class SlowVsFast {
    public static void main(String[] args) {
        int[] sortedArray = new int[100_000];
        for (int i = 0; i < sortedArray.length; i++) {
            sortedArray[i] = i;
        }
        int target = 99_999;

        // --- Slow: Linear Search (O(n)) ---
        long startLinear = System.nanoTime();
        boolean foundLinear = linearSearch(sortedArray, target);
        long endLinear = System.nanoTime();
        long timeLinear = endLinear - startLinear;

        // --- Fast: Binary Search (O(log n)) ---
        long startBinary = System.nanoTime();
        boolean foundBinary = binarySearch(sortedArray, target);
        long endBinary = System.nanoTime();
        long timeBinary = endBinary - startBinary;

        System.out.println("Linear search result: " + foundLinear + " | Time: " + timeLinear + " ns");
        System.out.println("Binary search result: " + foundBinary + " | Time: " + timeBinary + " ns");
        System.out.println("Binary search is approximately " + (timeLinear / timeBinary) + "x faster.");
    }

    // O(n) – checks every element
    static boolean linearSearch(int[] arr, int target) {
        for (int num : arr) {
            if (num == target) return true;
        }
        return false;
    }

    // O(log n) – repeatedly halves the search space
    static boolean binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == target) return true;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
}