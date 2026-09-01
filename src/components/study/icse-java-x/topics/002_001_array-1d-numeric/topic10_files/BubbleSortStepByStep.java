
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
                
                // ICSE Syllabus: Manual array element display using loop
        System.out.print("    Array now: " + "[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
        }
        System.out.println("]");
            }
            
            // ICSE Syllabus: Manual array element display using loop
        System.out.print("End of pass " + (i + 1) + ": " + "[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
        }
        System.out.println("]");
            
            if (!swapped) {
                System.out.println("\nNo swaps in pass " + (i + 1) + " - array is sorted!");
                break;
            }
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Initial array: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Target: Sort in ascending order\n");
        
        bubbleSortWithTrace(numbers);
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nFinal sorted array: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}