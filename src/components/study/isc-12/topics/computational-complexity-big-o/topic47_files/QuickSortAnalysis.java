import java.util.Random;

/**
 * Analyzes quicksort performance with different pivot choices and input types.
 * Shows the difference between best-case and worst-case scenarios.
 */
public class QuickSortAnalysis {
    private static int comparisons = 0;

    public static void main(String[] args) {
        int n = 10000;

        System.out.println("Quick Sort Analysis (n = " + n + ")");
        System.out.println("==================================");

        // 1. Best case: random array with random pivot
        int[] randomArr = generateRandomArray(n);
        comparisons = 0;
        long start = System.nanoTime();
        quickSortRandomPivot(randomArr, 0, randomArr.length - 1);
        long end = System.nanoTime();
        System.out.println("Random pivot, random data: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");

        // 2. Worst case: sorted array with first-element pivot
        int[] sortedArr = new int[n];
        for (int i = 0; i < n; i++) sortedArr[i] = i;
        comparisons = 0;
        start = System.nanoTime();
        quickSortFirstPivot(sortedArr, 0, sortedArr.length - 1);
        end = System.nanoTime();
        System.out.println("First-element pivot, sorted data: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");

        // 3. Random pivot on sorted data
        sortedArr = new int[n];
        for (int i = 0; i < n; i++) sortedArr[i] = i;
        comparisons = 0;
        start = System.nanoTime();
        quickSortRandomPivot(sortedArr, 0, sortedArr.length - 1);
        end = System.nanoTime();
        System.out.println("Random pivot, sorted data: " + comparisons + " comparisons, " +
                           (end - start) / 1_000_000 + " ms");

        // Show theoretical values
        double avgComparisons = n * (Math.log(n) / Math.log(2));
        double worstComparisons = (double)n * n / 2;
        System.out.println("\nTheoretical: O(n log n) ≈ " + (int)avgComparisons + " comparisons");
        System.out.println("Theoretical worst: O(n²) ≈ " + (int)worstComparisons + " comparisons");
    }

    public static int[] generateRandomArray(int n) {
        int[] arr = new int[n];
        Random rand = new Random(42);
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
    }

    public static void quickSortFirstPivot(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partitionFirstPivot(arr, low, high);
            quickSortFirstPivot(arr, low, pivotIndex - 1);
            quickSortFirstPivot(arr, pivotIndex + 1, high);
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

    public static void quickSortRandomPivot(int[] arr, int low, int high) {
        if (low < high) {
            int randomIndex = low + new Random().nextInt(high - low + 1);
            swap(arr, randomIndex, high);
            int pivotIndex = partitionRandomPivot(arr, low, high);
            quickSortRandomPivot(arr, low, pivotIndex - 1);
            quickSortRandomPivot(arr, pivotIndex + 1, high);
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

    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}