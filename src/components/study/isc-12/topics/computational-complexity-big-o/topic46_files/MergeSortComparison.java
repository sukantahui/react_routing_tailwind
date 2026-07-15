/**
 * Compares merge sort with other sorting algorithms:
 * - Recursive Merge Sort (O(n log n) time, O(n) space)
 * - Iterative Merge Sort (O(n log n) time, O(n) space, O(1) stack)
 * - QuickSort (O(n log n) average, O(n²) worst)
 * - Insertion Sort (O(n²) worst, O(n) best)
 * 
 * For small n, insertion sort can be faster.
 */
public class MergeSortComparison {
    public static void main(String[] args) {
        int n = 1000;

        System.out.println("=== Sorting Algorithm Comparison ===");
        System.out.println("n = " + n);
        System.out.println();

        int[] arr = generateRandomArray(n);

        // 1. Recursive Merge Sort
        long start = System.nanoTime();
        int[] mergeArr = arr.clone();
        MergeSortRecursive.mergeSort(mergeArr, 0, mergeArr.length - 1);
        long end = System.nanoTime();
        System.out.println("1. Recursive Merge Sort: " + (end - start) / 1_000_000 + " ms");
        System.out.println("   O(n log n) time, O(n) space");

        // 2. Iterative Merge Sort (bottom-up)
        start = System.nanoTime();
        int[] iterMergeArr = arr.clone();
        iterativeMergeSort(iterMergeArr);
        end = System.nanoTime();
        System.out.println("2. Iterative Merge Sort: " + (end - start) / 1_000_000 + " ms");
        System.out.println("   O(n log n) time, O(n) space, O(1) stack");

        // 3. QuickSort (average O(n log n))
        start = System.nanoTime();
        int[] quickArr = arr.clone();
        quickSort(quickArr, 0, quickArr.length - 1);
        end = System.nanoTime();
        System.out.println("3. QuickSort: " + (end - start) / 1_000_000 + " ms");
        System.out.println("   O(n log n) average, O(n²) worst");

        // 4. Insertion Sort (for comparison, use smaller n to keep time reasonable)
        System.out.println("\nFor small n (n=100):");
        int smallN = 100;
        int[] smallArr = generateRandomArray(smallN);

        start = System.nanoTime();
        int[] insertArr = smallArr.clone();
        insertionSort(insertArr);
        end = System.nanoTime();
        System.out.println("Insertion Sort (n=" + smallN + "): " + (end - start) / 1_000_000 + " ms");
        System.out.println("   O(n²) worst, O(n) best — good for small n.");

        System.out.println("\nMerge sort is guaranteed O(n log n) and stable.");
        System.out.println("Quicksort is faster on average but O(n²) worst-case.");
        System.out.println("Iterative merge sort avoids recursion stack overhead.");
    }

    public static int[] generateRandomArray(int n) {
        int[] arr = new int[n];
        java.util.Random rand = new java.util.Random(42);
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
    }

    // Iterative (bottom-up) merge sort
    public static void iterativeMergeSort(int[] arr) {
        int n = arr.length;
        int[] temp = new int[n];
        for (int size = 1; size < n; size *= 2) {
            for (int left = 0; left < n - size; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min(left + 2 * size - 1, n - 1);
                merge(arr, temp, left, mid, right);
            }
        }
    }

    public static void merge(int[] arr, int[] temp, int left, int mid, int right) {
        int i = left, j = mid + 1, k = left;
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, left, arr, left, right - left + 1);
    }

    // QuickSort (simple implementation)
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    // Insertion sort
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}