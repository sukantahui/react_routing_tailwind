import java.util.Random;

/**
 * Compares different pivot selection strategies:
 * 1. First element pivot (bad for sorted data)
 * 2. Random pivot (good on average)
 * 3. Median-of-three pivot (good and consistent)
 */
public class QuickSortPivotComparison {
    private static int comparisons = 0;

    public static void main(String[] args) {
        int n = 10000;
        System.out.println("=== Pivot Selection Comparison ===");
        System.out.println("n = " + n);
        System.out.println();

        // Generate test data: sorted array (worst-case for first-element pivot)
        int[] sortedArr = new int[n];
        for (int i = 0; i < n; i++) sortedArr[i] = i;

        // 1. First element pivot
        comparisons = 0;
        long start = System.nanoTime();
        quickSortFirstPivot(sortedArr.clone(), 0, n - 1);
        long end = System.nanoTime();
        System.out.println("1. First-element pivot: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");
        System.out.println("   O(n²) on sorted data!");

        // 2. Random pivot
        comparisons = 0;
        start = System.nanoTime();
        quickSortRandomPivot(sortedArr.clone(), 0, n - 1);
        end = System.nanoTime();
        System.out.println("2. Random pivot: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");
        System.out.println("   O(n log n) expected");

        // 3. Median-of-three pivot
        comparisons = 0;
        start = System.nanoTime();
        quickSortMedianThree(sortedArr.clone(), 0, n - 1);
        end = System.nanoTime();
        System.out.println("3. Median-of-three pivot: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");
        System.out.println("   O(n log n) on average");

        // Test on random data
        System.out.println("\nOn random data:");
        int[] randomArr = generateRandomArray(n);

        comparisons = 0;
        start = System.nanoTime();
        quickSortRandomPivot(randomArr.clone(), 0, n - 1);
        end = System.nanoTime();
        System.out.println("Random pivot: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");

        comparisons = 0;
        start = System.nanoTime();
        quickSortMedianThree(randomArr.clone(), 0, n - 1);
        end = System.nanoTime();
        System.out.println("Median-of-three: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");

        System.out.println("\nRandom pivot is safe and easy to implement.");
        System.out.println("Median-of-three gives better constant factors in practice.");
        System.out.println("Never use first-element pivot on sorted data!");
    }

    public static int[] generateRandomArray(int n) {
        int[] arr = new int[n];
        Random rand = new Random(42);
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
    }

    // ---- First Element Pivot ----
    public static void quickSortFirstPivot(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partitionFirstPivot(arr, low, high);
            quickSortFirstPivot(arr, low, pi - 1);
            quickSortFirstPivot(arr, pi + 1, high);
        }
    }

    public static int partitionFirstPivot(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low + 1;
        for (int j = low + 1; j <= high; j++) {
            comparisons++;
            if (arr[j] < pivot) {
                swap(arr, i, j);
                i++;
            }
        }
        swap(arr, low, i - 1);
        return i - 1;
    }

    // ---- Random Pivot ----
    public static void quickSortRandomPivot(int[] arr, int low, int high) {
        if (low < high) {
            int randIdx = low + new Random().nextInt(high - low + 1);
            swap(arr, randIdx, high);
            int pi = partitionRandomPivot(arr, low, high);
            quickSortRandomPivot(arr, low, pi - 1);
            quickSortRandomPivot(arr, pi + 1, high);
        }
    }

    public static int partitionRandomPivot(int[] arr, int low, int high) {
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

    // ---- Median-of-Three Pivot ----
    public static void quickSortMedianThree(int[] arr, int low, int high) {
        if (low < high) {
            int mid = low + (high - low) / 2;
            // Sort low, mid, high to find median
            if (arr[low] > arr[mid]) swap(arr, low, mid);
            if (arr[low] > arr[high]) swap(arr, low, high);
            if (arr[mid] > arr[high]) swap(arr, mid, high);
            // Pivot is at mid, swap with high
            swap(arr, mid, high);
            int pi = partitionRandomPivot(arr, low, high);
            quickSortMedianThree(arr, low, pi - 1);
            quickSortMedianThree(arr, pi + 1, high);
        }
    }

    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}