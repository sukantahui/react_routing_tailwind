
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
            
            // ICSE Syllabus: Manual array element display using loop
        System.out.print("After pass " + (i + 1) + ": " + "[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
        }
        System.out.println("]");
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
        
        return ManualLoopArrayUtility.copyOf(result, k);
    }
    
    public static void main(String[] args) {
        int[] scores = {64, 25, 12, 22, 11, 90, 34};
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSortDescending(scores.clone());
        
        // Find top 3 scores
        int[] top3 = findTopK(scores, 3);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nTop 3 scores: " + "[");
        for (int i = 0; i < top3.length; i++) {
            System.out.print(top3[i] + (i < top3.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Student percentages
        int[] percentages = {85, 92, 78, 96, 88, 91, 84};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nAll percentages: " + "[");
        for (int i = 0; i < percentages.length; i++) {
            System.out.print(percentages[i] + (i < percentages.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSortDescending(percentages);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Ranked percentages: " + "[");
        for (int i = 0; i < percentages.length; i++) {
            System.out.print(percentages[i] + (i < percentages.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}