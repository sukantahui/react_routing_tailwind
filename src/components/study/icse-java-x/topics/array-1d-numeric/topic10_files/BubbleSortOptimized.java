import java.util.Arrays;

public class BubbleSortOptimized {
    
    // Optimized bubble sort with early termination
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            // Last i elements are already sorted
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swaps, array is sorted
            if (!swapped) {
                System.out.println("Array sorted after pass " + (i + 1));
                break;
            }
        }
    }
    
    public static void main(String[] args) {
        // Already sorted array - best case
        int[] sorted = {11, 12, 22, 25, 34, 64, 90};
        System.out.println("Testing with sorted array:");
        System.out.println("Original: " + Arrays.toString(sorted));
        bubbleSort(sorted);
        System.out.println("Sorted: " + Arrays.toString(sorted));
        
        // Nearly sorted array
        int[] nearlySorted = {11, 12, 25, 22, 34, 64, 90};
        System.out.println("\nTesting with nearly sorted array:");
        System.out.println("Original: " + Arrays.toString(nearlySorted));
        bubbleSort(nearlySorted);
        System.out.println("Sorted: " + Arrays.toString(nearlySorted));
        
        // Random array
        int[] random = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("\nTesting with random array:");
        System.out.println("Original: " + Arrays.toString(random));
        bubbleSort(random);
        System.out.println("Sorted: " + Arrays.toString(random));
    }
}