/**
 * Quick Sort — Recursive Implementation
 * Average Time Complexity: O(n log n)
 * Worst Time Complexity: O(n²) (when pivot is bad)
 * Space Complexity: O(log n) (recursion stack)
 */
public class QuickSortRecursive {
    private static int comparisons = 0;
    private static int swaps = 0;

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original array: " + arrayToString(arr));

        comparisons = 0;
        swaps = 0;
        quickSort(arr, 0, arr.length - 1);

        System.out.println("Sorted array: " + arrayToString(arr));
        System.out.println("Number of comparisons: " + comparisons);
        System.out.println("Number of swaps: " + swaps);
        System.out.println("Time Complexity: O(n log n) average, O(n²) worst");
        System.out.println("Space Complexity: O(log n)");
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    // Partition using last element as pivot
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            comparisons++;
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        // Place pivot in correct position
        swap(arr, i + 1, high);
        return i + 1;
    }

    public static void swap(int[] arr, int i, int j) {
        if (i != j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            swaps++;
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