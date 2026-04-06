import java.util.Arrays;

public class SelectionSortBasic {
    
    // Basic selection sort
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            // Find minimum element in unsorted portion
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap minimum with first element of unsorted portion
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};
        
        System.out.println("Original array: " + Arrays.toString(numbers));
        selectionSort(numbers);
        System.out.println("Sorted array: " + Arrays.toString(numbers));
        
        // Barrackpore school roll numbers
        int[] rollNos = {105, 102, 108, 101, 107, 104, 103, 106};
        System.out.println("\nRoll numbers: " + Arrays.toString(rollNos));
        selectionSort(rollNos);
        System.out.println("Sorted rolls: " + Arrays.toString(rollNos));
    }
}