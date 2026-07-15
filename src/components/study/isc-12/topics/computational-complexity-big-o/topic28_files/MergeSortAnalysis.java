/**
 * Compares Merge Sort (O(n log n)) with other sorting algorithms.
 * Shows the performance differences for various input sizes.
 */
public class MergeSortAnalysis {
    private static int comparisons = 0;

    public static void main(String[] args) {
        int[] sizes = {100, 500, 1000, 2000, 5000};

        System.out.println("n\t\tMerge Sort (n log n)\tBubble Sort (n²)");
        System.out.println("--------------------------------------------------------");

        for (int n : sizes) {
            long mergeSteps = (long)(n * (Math.log(n) / Math.log(2)));
            long bubbleSteps = (long)n * n;
            System.out.printf("%d\t\t%d\t\t\t%d\n", n, mergeSteps, bubbleSteps);
            System.out.printf("\t\tRatio: %.1f\n", (double)bubbleSteps / mergeSteps);
        }

        // Simulate actual sorting on random arrays
        System.out.println("\nSimulating sorts on n=10,000:");
        int n = 10000;
        int[] arr = generateRandomArray(n);

        // Merge sort
        long start = System.nanoTime();
        int[] mergeArr = arr.clone();
        comparisons = 0;
        MergeSortRecursive.mergeSort(mergeArr, 0, mergeArr.length - 1);
        long end = System.nanoTime();
        System.out.println("Merge sort time: " + (end - start) / 1_000_000 + " ms");

        // Insertion sort (only for small n, but we'll use n=1000)
        System.out.println("\nFor n=1000, comparing with insertion sort:");
        n = 1000;
        arr = generateRandomArray(n);

        // Merge sort
        start = System.nanoTime();
        mergeArr = arr.clone();
        comparisons = 0;
        MergeSortRecursive.mergeSort(mergeArr, 0, mergeArr.length - 1);
        end = System.nanoTime();
        System.out.println("Merge sort time: " + (end - start) / 1_000_000 + " ms");

        // Insertion sort
        start = System.nanoTime();
        int[] insertArr = arr.clone();
        insertionSort(insertArr);
        end = System.nanoTime();
        System.out.println("Insertion sort time: " + (end - start) / 1_000_000 + " ms");
        System.out.println("Merge sort is stable and O(n log n), but insertion sort can be faster for small n.");
    }

    public static int[] generateRandomArray(int n) {
        int[] arr = new int[n];
        java.util.Random rand = new java.util.Random(42);
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
    }

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