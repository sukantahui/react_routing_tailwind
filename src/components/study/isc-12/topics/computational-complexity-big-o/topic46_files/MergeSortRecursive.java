/**
 * Recursive Merge Sort
 * Recurrence: T(n) = 2T(n/2) + O(n), T(1) = O(1)
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n) — auxiliary array for merging
 */
public class MergeSortRecursive {
    private static int comparisons = 0;
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Original array: " + arrayToString(arr));

        comparisons = 0;
        callCount = 0;
        maxDepth = 0;
        mergeSort(arr, 0, arr.length - 1);

        System.out.println("Sorted array: " + arrayToString(arr));
        System.out.println("Number of comparisons: " + comparisons);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Expected depth for n=" + arr.length + ": " + (int)(Math.log(arr.length)/Math.log(2)) + " levels");
        System.out.println("Time Complexity: O(n log n)");
        System.out.println("Space Complexity: O(n)");
    }

    public static void mergeSort(int[] arr, int left, int right) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
        depth--;
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Create temporary arrays
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];

        // Copy data to temp arrays
        System.arraycopy(arr, left, leftArr, 0, n1);
        System.arraycopy(arr, mid + 1, rightArr, 0, n2);

        // Merge the two arrays
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            comparisons++;
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }

        // Copy remaining elements
        while (i < n1) arr[k++] = leftArr[i++];
        while (j < n2) arr[k++] = rightArr[j++];
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

    private static int depth = 0;
}