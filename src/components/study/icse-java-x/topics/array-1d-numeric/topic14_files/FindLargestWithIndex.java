import java.util.Arrays;

public class FindLargestWithIndex {
    
    // Find maximum element and its index
    public static int findMaxIndex(int[] arr) {
        if (arr == null || arr.length == 0) {
            return -1;  // Return -1 for empty array
        }
        
        int maxIndex = 0;  // Start with first element
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > arr[maxIndex]) {
                maxIndex = i;  // Update index of maximum
            }
        }
        
        return maxIndex;
    }
    
    // Find maximum with detailed tracking
    public static void findMaxWithDetails(int[] arr) {
        if (arr == null || arr.length == 0) {
            System.out.println("Array is empty");
            return;
        }
        
        int max = arr[0];
        int maxIndex = 0;
        
        System.out.println("Starting search...");
        System.out.println("Initial max = " + max + " at index " + maxIndex);
        
        for (int i = 1; i < arr.length; i++) {
            System.out.println("Comparing arr[" + i + "] = " + arr[i] + " with max = " + max);
            
            if (arr[i] > max) {
                max = arr[i];
                maxIndex = i;
                System.out.println("  → New max found! Now max = " + max + " at index " + maxIndex);
            } else {
                System.out.println("  → No update");
            }
        }
        
        System.out.println("\n✓ Maximum value: " + max);
        System.out.println("✓ Found at index: " + maxIndex);
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34};
        
        System.out.println("Array: " + Arrays.toString(scores));
        
        int maxIdx = findMaxIndex(scores);
        System.out.println("Maximum value: " + scores[maxIdx]);
        System.out.println("Found at index: " + maxIdx);
        
        System.out.println("\n" + "=".repeat(40));
        findMaxWithDetails(scores);
        
        // Student heights example
        int[] heights = {165, 172, 158, 180, 169, 175};
        System.out.println("\nStudent heights: " + Arrays.toString(heights));
        int tallestIdx = findMaxIndex(heights);
        System.out.println("Tallest student height: " + heights[tallestIdx] + " cm");
        System.out.println("Position in array: " + tallestIdx);
    }
}