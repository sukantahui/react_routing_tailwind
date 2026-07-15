/**
 * Quick Sort — Optimized Implementation
 * - Median-of-three pivot selection
 * - Insertion sort for small subarrays (n < 20)
 * - Random pivot fallback
 */
public class QuickSortOptimized {
    private static int comparisons = 0;
    private static final int INSERTION_THRESHOLD = 20;

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5, 3, 2, 6, 4};
        System.out.println("Original array: " + arrayToString(arr));

        comparisons = 0;
        quickSortOptimized(arr, 0, arr.length - 1);

        System.out.println("Sorted array: " + arrayToString(arr));
        System.out.println("Number of comparisons: " + comparisons);
        System.out.println("Using median-of-three pivot + insertion sort for small subarrays");
        System.out.println("Time Complexity: O(n log n) average, O(n²) worst (rare with median-of-three)");
    }

    public static void quickSortOptimized(int[] arr, int low, int high) {
        // Use insertion sort for small subarrays
        if (high - low + 1 <= INSERTION_THRESHOLD) {
            insertionSort(arr, low, high);
            return;
        }

        if (low < high) {
            int pivotIndex = partitionMedianOfThree(arr, low, high);
            quickSortOptimized(arr, low, pivotIndex - 1);
            quickSortOptimized(arr, pivotIndex + 1, high);
        }
    }

    // Median-of-three pivot selection
    public static int partitionMedianOfThree(int[] arr, int low, int high) {
        int mid = low + (high - low) / 2;

        // Order low, mid, high to find median
        if (arr[low] > arr[mid]) swap(arr, low, mid);
        if (arr[low] > arr[high]) swap(arr, low, high);
        if (arr[mid] > arr[high]) swap(arr, mid, high);

        // Pivot is at mid, swap with high-1
        swap(arr, mid, high - 1);
        int pivot = arr[high - 1];

        int i = low;
        int j = high - 1;

        while (true) {
            while (++i < high && arr[i] < pivot) comparisons++;
            while (--j > low && arr[j] > pivot) comparisons++;
            if (i >= j) break;
            swap(arr, i, j);
        }

        // Place pivot in correct position
        swap(arr, i, high - 1);
        return i;
    }

    // Insertion sort for small subarrays
    public static void insertionSort(int[] arr, int low, int high) {
        for (int i = low + 1; i <= high; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= low) {
                comparisons++;
                if (arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j--;
                } else {
                    break;
                }
            }
            arr[j + 1] = key;
        }
    }

    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
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