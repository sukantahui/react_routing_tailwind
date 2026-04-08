import java.util.Arrays;

public class SelectionSortStepByStep {
    
    // Selection sort with detailed logging
    public static void selectionSortWithTrace(int[] arr) {
        int n = arr.length;
        
        System.out.println("Starting Selection Sort...\n");
        System.out.println("Initial array: " + Arrays.toString(arr));
        System.out.println();
        
        for (int i = 0; i < n - 1; i++) {
            System.out.println("Pass " + (i + 1) + ":");
            System.out.println("  Looking for minimum in indices [" + i + " to " + (n-1) + "]");
            
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                System.out.println("    Compare arr[" + j + "]=" + arr[j] + 
                                 " with arr[" + minIndex + "]=" + arr[minIndex]);
                
                if (arr[j] < arr[minIndex]) {
                    System.out.println("    → New minimum found at index " + j);
                    minIndex = j;
                }
            }
            
            System.out.println("  Minimum element: " + arr[minIndex] + " at index " + minIndex);
            
            if (minIndex != i) {
                System.out.println("  Swapping arr[" + i + "]=" + arr[i] + 
                                 " with arr[" + minIndex + "]=" + arr[minIndex]);
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            } else {
                System.out.println("  No swap needed (min already at correct position)");
            }
            
            System.out.println("  Array after pass " + (i + 1) + ": " + Arrays.toString(arr));
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};
        
        System.out.println("Target: Sort in ascending order");
        System.out.println("Original: " + Arrays.toString(numbers));
        System.out.println();
        
        selectionSortWithTrace(numbers);
        
        System.out.println("Final sorted array: " + Arrays.toString(numbers));
    }
}