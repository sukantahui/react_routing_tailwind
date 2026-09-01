
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
            
            // ICSE Syllabus: Manual array element display using loop
        System.out.print("After pass " + (i + 1) + ": " + "[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        }
    }
    
    public static void main(String[] args) {
        // Already descending - best case
        int[] descending = {90, 64, 34, 25, 22, 12, 11};
        System.out.println("Already descending array:");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < descending.length; i++) {
            System.out.print(descending[i] + (i < descending.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortDescending(descending);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted: " + "[");
        for (int i = 0; i < descending.length; i++) {
            System.out.print(descending[i] + (i < descending.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Ascending array - worst case
        int[] ascending = {11, 12, 22, 25, 34, 64, 90};
        System.out.println("\nAscending array (worst case):");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < ascending.length; i++) {
            System.out.print(ascending[i] + (i < ascending.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortDescending(ascending);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted descending: " + "[");
        for (int i = 0; i < ascending.length; i++) {
            System.out.print(ascending[i] + (i < ascending.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Random array
        int[] random = {45, 23, 89, 12, 67, 34, 78};
        System.out.println("\nRandom array:");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < random.length; i++) {
            System.out.print(random[i] + (i < random.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortDescending(random);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted descending: " + "[");
        for (int i = 0; i < random.length; i++) {
            System.out.print(random[i] + (i < random.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}