/**
 * Heap Sort — O(n log n) time in all cases.
 * Builds a max-heap and repeatedly extracts the maximum element.
 */
public class HeapSort {
    private static int comparisons = 0;

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        System.out.println("Original array:");
        printArray(arr);

        comparisons = 0;
        heapSort(arr);

        System.out.println("Sorted array:");
        printArray(arr);
        System.out.println("Number of comparisons: " + comparisons);
        System.out.println("Time complexity: O(n log n)");
    }

    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Heapify reduced heap
            heapify(arr, i, 0);
        }
    }

    public static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        comparisons++;
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        comparisons++;
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }

    public static void printArray(int[] arr) {
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}