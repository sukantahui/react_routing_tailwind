
public class SelectionSortOptimized {
    
    // Optimized selection sort with unnecessary swap prevention
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        int comparisons = 0;
        int swaps = 0;
        
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                comparisons++;
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Only swap if needed
            if (minIndex != i) {
                swaps++;
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
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
    
    // Find kth smallest element using selection sort concept
    public static int findKthSmallest(int[] arr, int k) {
        if (k < 1 || k > arr.length) {
            throw new IllegalArgumentException("Invalid k value");
        }
        
        // Run only k passes
        for (int i = 0; i < k; i++) {
            int minIndex = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        
        return arr[k - 1];
    }
    
    public static void main(String[] args) {
        int[] scores = {64, 25, 12, 22, 11, 90, 34};
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSort(scores.clone());
        
        // Find 3rd smallest
        int[] temp = {64, 25, 12, 22, 11, 90, 34};
        int kthSmallest = findKthSmallest(temp, 3);
        System.out.println("\n3rd smallest element: " + kthSmallest);
        
        // Student heights example
        int[] heights = {165, 172, 158, 180, 169, 175};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nStudent heights: " + "[");
        for (int i = 0; i < heights.length; i++) {
            System.out.print(heights[i] + (i < heights.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSort(heights);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted heights: " + "[");
        for (int i = 0; i < heights.length; i++) {
            System.out.print(heights[i] + (i < heights.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}