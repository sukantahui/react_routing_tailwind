/**
 * Insertion Sort — O(n²) worst case, O(n) best case.
 * Builds the sorted array one element at a time.
 */
public class InsertionSort {
    private static int comparisons = 0;
    private static int shifts = 0;

    public static void main(String[] args) {
        // Worst case: reverse sorted
        int[] arr = {9, 8, 7, 6, 5, 4, 3, 2, 1};
        System.out.println("Worst-case (reverse sorted):");
        printArray(arr);
        insertionSort(arr);
        System.out.println("Sorted:");
        printArray(arr);
        System.out.println("Comparisons: " + comparisons + ", Shifts: " + shifts);

        // Best case: already sorted
        int[] sorted = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        comparisons = 0;
        shifts = 0;
        System.out.println("\nBest-case (already sorted):");
        insertionSort(sorted);
        System.out.println("Comparisons: " + comparisons + ", Shifts: " + shifts);
        System.out.println("Insertion sort is O(n) in the best case (already sorted).");
        System.out.println("Worst-case is O(n²) (reverse sorted).");
    }

    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            // Move elements that are greater than key one position ahead
            while (j >= 0) {
                comparisons++;
                if (arr[j] > key) {
                    arr[j + 1] = arr[j];
                    shifts++;
                    j--;
                } else {
                    break;
                }
            }
            arr[j + 1] = key;
        }
        System.out.println("Insertion sort completed.");
    }

    public static void printArray(int[] arr) {
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}