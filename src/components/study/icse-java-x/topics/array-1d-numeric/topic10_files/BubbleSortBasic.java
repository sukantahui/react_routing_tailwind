import java.util.Arrays;

public class BubbleSortBasic {
    
    // Basic bubble sort - no optimization
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Number of passes
        for (int i = 0; i < n - 1; i++) {
            // Compare adjacent elements
            for (int j = 0; j < n - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] marks = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array: " + Arrays.toString(marks));
        bubbleSort(marks);
        System.out.println("Sorted array: " + Arrays.toString(marks));
        
        // Student scores example - Barrackpore school
        int[] scores = {78, 89, 45, 92, 67, 85};
        System.out.println("\nStudent scores: " + Arrays.toString(scores));
        bubbleSort(scores);
        System.out.println("Sorted scores: " + Arrays.toString(scores));
    }
}