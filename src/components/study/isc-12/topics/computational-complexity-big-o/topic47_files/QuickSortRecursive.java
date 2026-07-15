/**
 * Recursive Quick Sort
 * Average Time Complexity: O(n log n)
 * Worst Time Complexity: O(n²) (when pivot is bad)
 * Space Complexity: O(log n) average, O(n) worst (recursion stack)
 */
public class QuickSortRecursive {
    private static int comparisons = 0;
    private static int swaps = 0;
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original array: " + arrayToString(arr));

        comparisons = 0;
        swaps = 0;
        callCount = 0;
        maxDepth = 0;
        quickSort(arr, 0, arr.length - 1);

        System.out.println("Sorted array: " + arrayToString(arr));
        System.out.println("Number of comparisons: " + comparisons);
        System.out.println("Number of swaps: " + swaps);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time Complexity: O(n log n) average, O(n²) worst");
        System.out.println("Space Complexity: O(log n) average, O(n) worst");
    }

    public static void quickSort(int[] arr, int low, int high) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
        depth--;
    }

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

    private static int depth = 0;
}