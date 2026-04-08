import java.util.Arrays;

public class BubbleSortStepByStep {
    
    // Bubble sort with detailed logging
    public static void bubbleSortWithTrace(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        System.out.println("Starting Bubble Sort...\n");
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            System.out.println("Pass " + (i + 1) + ":");
            
            for (int j = 0; j < n - i - 1; j++) {
                System.out.print("  Compare arr[" + j + "]=" + arr[j] + 
                               " and arr[" + (j+1) + "]=" + arr[j+1]);
                
                if (arr[j] > arr[j + 1]) {
                    System.out.println(" → Swap!");
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                } else {
                    System.out.println(" → No swap");
                }
                
                System.out.println("    Array now: " + Arrays.toString(arr));
            }
            
            System.out.println("End of pass " + (i + 1) + ": " + Arrays.toString(arr));
            
            if (!swapped) {
                System.out.println("\nNo swaps in pass " + (i + 1) + " - array is sorted!");
                break;
            }
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Initial array: " + Arrays.toString(numbers));
        System.out.println("Target: Sort in ascending order\n");
        
        bubbleSortWithTrace(numbers);
        
        System.out.println("\nFinal sorted array: " + Arrays.toString(numbers));
    }
}