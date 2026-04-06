import java.util.Arrays;

public class FindLargestBasic {
    
    // Find maximum element in array
    public static int findMax(int[] arr) {
        // Handle empty array
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array cannot be empty");
        }
        
        int max = arr[0];  // Assume first element is largest
        
        // Start from index 1 (already compared index 0)
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];  // Found new maximum
            }
        }
        
        return max;
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34};
        
        System.out.println("Array: " + Arrays.toString(scores));
        System.out.println("Largest element: " + findMax(scores));
        
        // Barrackpore school exam scores
        int[] examScores = {78, 92, 85, 96, 67, 88, 91};
        System.out.println("\nExam scores: " + Arrays.toString(examScores));
        System.out.println("Highest score: " + findMax(examScores));
        
        // Negative numbers test
        int[] temperatures = {-5, -12, -3, -8, -1};
        System.out.println("\nTemperatures: " + Arrays.toString(temperatures));
        System.out.println("Warmest: " + findMax(temperatures));
    }
}