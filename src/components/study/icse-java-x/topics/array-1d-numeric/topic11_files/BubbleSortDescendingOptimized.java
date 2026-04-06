import java.util.Arrays;

public class BubbleSortDescendingOptimized {
    
    // Optimized descending bubble sort
    public static void bubbleSortDescending(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            // Last i elements are already in position
            for (int j = 0; j < n - i - 1; j++) {
                // Swap if left is smaller than right (for descending)
                if (arr[j] < arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swaps, array is sorted descending
            if (!swapped) {
                System.out.println("Array sorted after pass " + (i + 1));
                break;
            }
            
            System.out.println("After pass " + (i + 1) + ": " + Arrays.toString(arr));
        }
    }
    
    public static void main(String[] args) {
        // Already descending - best case
        int[] descending = {90, 64, 34, 25, 22, 12, 11};
        System.out.println("Already descending array:");
        System.out.println("Original: " + Arrays.toString(descending));
        bubbleSortDescending(descending);
        System.out.println("Sorted: " + Arrays.toString(descending));
        
        // Ascending array - worst case
        int[] ascending = {11, 12, 22, 25, 34, 64, 90};
        System.out.println("\nAscending array (worst case):");
        System.out.println("Original: " + Arrays.toString(ascending));
        bubbleSortDescending(ascending);
        System.out.println("Sorted descending: " + Arrays.toString(ascending));
        
        // Random array
        int[] random = {45, 23, 89, 12, 67, 34, 78};
        System.out.println("\nRandom array:");
        System.out.println("Original: " + Arrays.toString(random));
        bubbleSortDescending(random);
        System.out.println("Sorted descending: " + Arrays.toString(random));
    }
}