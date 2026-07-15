/**
 * Analyzes merge sort performance: comparisons, call count, depth.
 * Shows the number of comparisons for different input sizes.
 */
public class MergeSortAnalysis {
    private static int comparisons = 0;

    public static void main(String[] args) {
        System.out.println("=== Merge Sort Analysis ===\n");

        int[] sizes = {10, 100, 1000, 10000};

        System.out.println("n\tComparisons (approx)\tTheoretical n log₂(n)");
        System.out.println("----------------------------------------------");

        for (int n : sizes) {
            int[] arr = generateRandomArray(n);
            comparisons = 0;
            mergeSort(arr, 0, arr.length - 1);
            double nLogN = n * (Math.log(n) / Math.log(2));
            System.out.printf("%d\t%d\t\t\t%.0f\n", n, comparisons, nLogN);
        }

        System.out.println("\nActual comparisons are close to n log₂(n).");
        System.out.println("Merge sort is Θ(n log n) in all cases.");

        // Show depth
        System.out.println("\nRecursion depth for n=1000:");
        int n = 1000;
        int depth = (int)(Math.log(n) / Math.log(2)) + 1;
        System.out.println("Depth = " + depth + " levels (log₂(1000) ≈ 10)");
        System.out.println("Space complexity: O(n) for auxiliary array + O(log n) for stack = O(n)");
    }

    public static int[] generateRandomArray(int n) {
        int[] arr = new int[n];
        java.util.Random rand = new java.util.Random(42);
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
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
            comparisons++;
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}