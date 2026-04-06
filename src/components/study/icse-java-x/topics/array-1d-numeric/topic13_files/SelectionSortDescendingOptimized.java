import java.util.Arrays;

public class SelectionSortDescendingOptimized {
    
    // Optimized descending selection sort with statistics
    public static void selectionSortDescending(int[] arr) {
        int n = arr.length;
        int comparisons = 0;
        int swaps = 0;
        
        for (int i = 0; i < n - 1; i++) {
            int maxIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                comparisons++;
                if (arr[j] > arr[maxIndex]) {
                    maxIndex = j;
                }
            }
            
            // Only swap if needed
            if (maxIndex != i) {
                swaps++;
                int temp = arr[i];
                arr[i] = arr[maxIndex];
                arr[maxIndex] = temp;
            }
            
            System.out.println("After pass " + (i + 1) + ": " + Arrays.toString(arr));
        }
        
        System.out.println("\nTotal comparisons: " + comparisons);
        System.out.println("Total swaps: " + swaps);
    }
    
    // Find top k largest elements using selection sort concept
    public static int[] findTopK(int[] arr, int k) {
        if (k < 1 || k > arr.length) {
            throw new IllegalArgumentException("Invalid k value");
        }
        
        int[] result = arr.clone();
        
        // Run only k passes of descending selection sort
        for (int i = 0; i < k; i++) {
            int maxIndex = i;
            for (int j = i + 1; j < result.length; j++) {
                if (result[j] > result[maxIndex]) {
                    maxIndex = j;
                }
            }
            int temp = result[i];
            result[i] = result[maxIndex];
            result[maxIndex] = temp;
        }
        
        return Arrays.copyOf(result, k);
    }
    
    public static void main(String[] args) {
        int[] scores = {64, 25, 12, 22, 11, 90, 34};
        
        System.out.println("Original: " + Arrays.toString(scores));
        selectionSortDescending(scores.clone());
        
        // Find top 3 scores
        int[] top3 = findTopK(scores, 3);
        System.out.println("\nTop 3 scores: " + Arrays.toString(top3));
        
        // Student percentages
        int[] percentages = {85, 92, 78, 96, 88, 91, 84};
        System.out.println("\nAll percentages: " + Arrays.toString(percentages));
        selectionSortDescending(percentages);
        System.out.println("Ranked percentages: " + Arrays.toString(percentages));
    }
}