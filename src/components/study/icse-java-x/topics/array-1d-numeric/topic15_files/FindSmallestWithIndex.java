import java.util.Arrays;

public class FindSmallestWithIndex {
    
    // Find minimum element and its index
    public static int findMinIndex(int[] arr) {
        if (arr == null || arr.length == 0) {
            return -1;  // Return -1 for empty array
        }
        
        int minIndex = 0;  // Start with first element
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < arr[minIndex]) {  // Note: < operator
                minIndex = i;  // Update index of minimum
            }
        }
        
        return minIndex;
    }
    
    // Find minimum with detailed tracking
    public static void findMinWithDetails(int[] arr) {
        if (arr == null || arr.length == 0) {
            System.out.println("Array is empty");
            return;
        }
        
        int min = arr[0];
        int minIndex = 0;
        
        System.out.println("Starting search for minimum...");
        System.out.println("Initial min = " + min + " at index " + minIndex);
        
        for (int i = 1; i < arr.length; i++) {
            System.out.println("Comparing arr[" + i + "] = " + arr[i] + " with min = " + min);
            
            if (arr[i] < min) {
                min = arr[i];
                minIndex = i;
                System.out.println("  → New minimum found! Now min = " + min + " at index " + minIndex);
            } else {
                System.out.println("  → No update");
            }
        }
        
        System.out.println("\n✓ Minimum value: " + min);
        System.out.println("✓ Found at index: " + minIndex);
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34};
        
        System.out.println("Array: " + Arrays.toString(scores));
        
        int minIdx = findMinIndex(scores);
        System.out.println("Minimum value: " + scores[minIdx]);
        System.out.println("Found at index: " + minIdx);
        
        System.out.println("\n" + "=".repeat(40));
        findMinWithDetails(scores);
        
        // Student heights - find shortest
        int[] heights = {165, 172, 158, 180, 169, 175};
        System.out.println("\nStudent heights: " + Arrays.toString(heights));
        int shortestIdx = findMinIndex(heights);
        System.out.println("Shortest student height: " + heights[shortestIdx] + " cm");
        System.out.println("Position in array: " + shortestIdx);
    }
}