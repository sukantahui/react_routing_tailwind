/**
 * Merge Sort — Iterative (Bottom-up) Implementation
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n) for temporary array
 * No recursion stack overhead.
 */
public class MergeSortIterative {
    private static int comparisons = 0;

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Original array: " + arrayToString(arr));

        comparisons = 0;
        mergeSortIterative(arr);

        System.out.println("Sorted array: " + arrayToString(arr));
        System.out.println("Number of comparisons: " + comparisons);
        System.out.println("Time Complexity: O(n log n)");
        System.out.println("Space Complexity: O(n)");
        System.out.println("Recursion stack space: O(1)");
    }

    public static void mergeSortIterative(int[] arr) {
        int n = arr.length;
        int[] temp = new int[n];

        // currSize = size of subarrays to be merged
        // Starts with 1, doubles each time
        for (int currSize = 1; currSize < n; currSize *= 2) {
            for (int left = 0; left < n - currSize; left += 2 * currSize) {
                int mid = left + currSize - 1;
                int right = Math.min(left + 2 * currSize - 1, n - 1);
                merge(arr, temp, left, mid, right);
            }
        }
    }

    public static void merge(int[] arr, int[] temp, int left, int mid, int right) {
        int i = left;
        int j = mid + 1;
        int k = left;

        while (i <= mid && j <= right) {
            comparisons++;
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        // Copy back from temp to arr
        for (int idx = left; idx <= right; idx++) {
            arr[idx] = temp[idx];
        }
    }

    public static String arrayToString(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
}