
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
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < sorted.length; i++) {
            System.out.print(sorted[i] + (i < sorted.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(sorted);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted: " + "[");
        for (int i = 0; i < sorted.length; i++) {
            System.out.print(sorted[i] + (i < sorted.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Nearly sorted array
        int[] nearlySorted = {11, 12, 25, 22, 34, 64, 90};
        System.out.println("\nTesting with nearly sorted array:");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < nearlySorted.length; i++) {
            System.out.print(nearlySorted[i] + (i < nearlySorted.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(nearlySorted);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted: " + "[");
        for (int i = 0; i < nearlySorted.length; i++) {
            System.out.print(nearlySorted[i] + (i < nearlySorted.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Random array
        int[] random = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("\nTesting with random array:");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < random.length; i++) {
            System.out.print(random[i] + (i < random.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(random);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted: " + "[");
        for (int i = 0; i < random.length; i++) {
            System.out.print(random[i] + (i < random.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}