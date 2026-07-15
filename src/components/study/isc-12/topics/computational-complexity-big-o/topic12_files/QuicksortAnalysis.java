import java.util.Arrays;
import java.util.Random;

/**
 * Analyzes quicksort for best, worst, and average cases.
 * Shows how pivot selection affects performance.
 */
public class QuicksortAnalysis {
    private static int comparisons = 0;

    public static void main(String[] args) {
        int n = 10000;

        // Worst case: already sorted with bad pivot (first element)
        int[] worstArray = new int[n];
        for (int i = 0; i < n; i++) worstArray[i] = i;
        comparisons = 0;
        quicksort(worstArray, 0, n - 1, true);
        System.out.println("Worst-case (sorted, bad pivot): " + comparisons + " comparisons → O(n²)");

        // Best case: median pivot (or balanced) - we'll use random pivot for average
        int[] bestArray = new int[n];
        for (int i = 0; i < n; i++) bestArray[i] = i;
        comparisons = 0;
        quicksort(bestArray, 0, n - 1, false);
        System.out.println("Best/Average (random pivot): " + comparisons + " comparisons → Θ(n log n)");

        // Average case: random array with random pivot
        int[] avgArray = new int[n];
        Random rand = new Random(42);
        for (int i = 0; i < n; i++) avgArray[i] = rand.nextInt(n);
        comparisons = 0;
        quicksort(avgArray, 0, n - 1, false);
        System.out.println("Average (random array, random pivot): " + comparisons + " comparisons → Θ(n log n)");
    }

    public static void quicksort(int[] arr, int low, int high, boolean useBadPivot) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high, useBadPivot);
            quicksort(arr, low, pivotIndex - 1, useBadPivot);
            quicksort(arr, pivotIndex + 1, high, useBadPivot);
        }
    }

    public static int partition(int[] arr, int low, int high, boolean useBadPivot) {
        int pivot = useBadPivot ? arr[low] : arr[low + (high - low) / 2];
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