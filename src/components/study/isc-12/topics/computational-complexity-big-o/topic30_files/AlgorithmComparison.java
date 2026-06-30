/**
 * Compares different algorithms for the same task.
 * Shows how choice of algorithm affects performance.
 */
public class AlgorithmComparison {
    public static void main(String[] args) {
        int n = 100000;

        // 1. Search: Linear vs Binary
        int[] sortedArr = new int[n];
        for (int i = 0; i < n; i++) sortedArr[i] = i;
        int target = n - 1;

        System.out.println("=== Search Comparison ===");
        System.out.println("Array size: " + n);

        long start = System.nanoTime();
        int linearResult = linearSearch(sortedArr, target);
        long end = System.nanoTime();
        System.out.println("Linear search: " + (end - start) / 1_000_000 + " ms");

        start = System.nanoTime();
        int binaryResult = binarySearch(sortedArr, target);
        end = System.nanoTime();
        System.out.println("Binary search: " + (end - start) / 1_000_000 + " ms");

        // 2. Sorting: Bubble vs Merge (using smaller n for bubble)
        System.out.println("\n=== Sorting Comparison ===");
        int smallN = 1000;
        int[] arr1 = generateRandomArray(smallN);
        int[] arr2 = arr1.clone();

        start = System.nanoTime();
        bubbleSort(arr1);
        end = System.nanoTime();
        System.out.println("Bubble sort (n=" + smallN + "): " + (end - start) / 1_000_000 + " ms");

        start = System.nanoTime();
        mergeSort(arr2, 0, arr2.length - 1);
        end = System.nanoTime();
        System.out.println("Merge sort (n=" + smallN + "): " + (end - start) / 1_000_000 + " ms");

        System.out.println("\nBinary search is O(log n) vs linear O(n) — huge difference.");
        System.out.println("Merge sort is O(n log n) vs bubble O(n²) — also huge.");
    }

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }

    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];
        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static int[] generateRandomArray(int n) {
        int[] arr = new int[n];
        java.util.Random rand = new java.util.Random(42);
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
    }
}