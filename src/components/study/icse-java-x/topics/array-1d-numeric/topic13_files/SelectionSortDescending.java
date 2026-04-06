import java.util.Arrays;

public class SelectionSortDescending {
    
    // Basic descending selection sort
    public static void selectionSortDescending(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            // Find maximum element in unsorted portion
            int maxIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j] > arr[maxIndex]) {  // Note: > for descending
                    maxIndex = j;
                }
            }
            
            // Swap maximum with first element of unsorted portion
            if (maxIndex != i) {
                int temp = arr[i];
                arr[i] = arr[maxIndex];
                arr[maxIndex] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11, 90, 34};
        
        System.out.println("Original array: " + Arrays.toString(numbers));
        selectionSortDescending(numbers);
        System.out.println("Descending order: " + Arrays.toString(numbers));
        
        // Barrackpore school highest scores first
        int[] scores = {78, 92, 85, 96, 67, 88, 91};
        System.out.println("\nStudent scores: " + Arrays.toString(scores));
        selectionSortDescending(scores);
        System.out.println("Ranked (highest first): " + Arrays.toString(scores));
    }
}