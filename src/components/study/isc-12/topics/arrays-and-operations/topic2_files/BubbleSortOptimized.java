public class BubbleSortOptimized {
    public static void optimizedBubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no swaps, array is already sorted
            if (!swapped) break;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7}; // already sorted
        System.out.println("Optimized bubble sort on sorted array: only O(n) passes");
        optimizedBubbleSort(arr);
        // No unnecessary passes
    }
}