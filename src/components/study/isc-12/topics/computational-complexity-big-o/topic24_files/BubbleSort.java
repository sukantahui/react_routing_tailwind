/**
 * Bubble Sort — O(n²) time worst case.
 * Compares adjacent elements and swaps them if they are in the wrong order.
 * With optimization: O(n) best case (already sorted).
 */
public class BubbleSort {
    private static int comparisons = 0;
    private static int swaps = 0;

    public static void main(String[] args) {
        // Worst case: reverse sorted
        int[] arr = {9, 8, 7, 6, 5, 4, 3, 2, 1};
        System.out.println("Worst-case (reverse sorted):");
        printArray(arr);
        bubbleSort(arr);
        System.out.println("Sorted:");
        printArray(arr);
        System.out.println("Comparisons: " + comparisons + ", Swaps: " + swaps);

        // Best case: already sorted
        int[] sorted = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        comparisons = 0;
        swaps = 0;
        System.out.println("\nBest-case (already sorted):");
        bubbleSort(sorted);
        System.out.println("Comparisons: " + comparisons + ", Swaps: " + swaps);
        System.out.println("With optimization, bubble sort is O(n) in the best case.");
    }

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;

        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                comparisons++;
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swaps++;
                    swapped = true;
                }
            }
            // If no swaps were made, the array is already sorted
            if (!swapped) break;
        }
        System.out.println("Bubble sort completed.");
    }

    public static void printArray(int[] arr) {
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}