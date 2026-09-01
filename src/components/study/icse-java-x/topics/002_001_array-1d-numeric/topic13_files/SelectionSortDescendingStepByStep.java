
public class SelectionSortDescendingStepByStep {
    
    // Descending selection sort with detailed logging
    public static void selectionSortDescendingWithTrace(int[] arr) {
        int n = arr.length;
        
        System.out.println("Starting Descending Selection Sort...\n");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Initial array: " + "[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println();
        
        for (int i = 0; i < n - 1; i++) {
            System.out.println("Pass " + (i + 1) + ":");
            System.out.println("  Looking for MAXIMUM in indices [" + i + " to " + (n-1) + "]");
            
            int maxIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                System.out.println("    Compare arr[" + j + "]=" + arr[j] + 
                                 " with arr[" + maxIndex + "]=" + arr[maxIndex]);
                
                if (arr[j] > arr[maxIndex]) {
                    System.out.println("    → New maximum found at index " + j + " (value " + arr[j] + ")");
                    maxIndex = j;
                }
            }
            
            System.out.println("  Maximum element: " + arr[maxIndex] + " at index " + maxIndex);
            
            if (maxIndex != i) {
                System.out.println("  Swapping arr[" + i + "]=" + arr[i] + 
                                 " with arr[" + maxIndex + "]=" + arr[maxIndex]);
                int temp = arr[i];
                arr[i] = arr[maxIndex];
                arr[maxIndex] = temp;
            } else {
                System.out.println("  No swap needed (max already at correct position)");
            }
            
            // ICSE Syllabus: Manual array element display using loop
        System.out.print("  Array after pass " + (i + 1) + ": " + "[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
        }
        System.out.println("]");
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11, 90, 34};
        
        System.out.println("Target: Sort in descending order (largest to smallest)");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println();
        
        selectionSortDescendingWithTrace(numbers);
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Final sorted array: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}