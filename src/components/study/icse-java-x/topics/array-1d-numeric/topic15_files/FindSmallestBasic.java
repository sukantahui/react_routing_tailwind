import java.util.Arrays;

public class FindSmallestBasic {
    
    // Find minimum element in array
    public static int findMin(int[] arr) {
        // Handle empty array
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array cannot be empty");
        }
        
        int min = arr[0];  // Assume first element is smallest
        
        // Start from index 1 (already compared index 0)
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {  // Note: < operator for minimum
                min = arr[i];     // Found new minimum
            }
        }
        
        return min;
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34};
        
        System.out.println("Array: " + Arrays.toString(scores));
        System.out.println("Smallest element: " + findMin(scores));
        
        // Barrackpore school exam scores - find lowest
        int[] examScores = {78, 92, 85, 96, 67, 88, 91};
        System.out.println("\nExam scores: " + Arrays.toString(examScores));
        System.out.println("Lowest score: " + findMin(examScores));
        
        // Negative numbers test
        int[] temperatures = {-5, -12, -3, -8, -1};
        System.out.println("\nTemperatures: " + Arrays.toString(temperatures));
        System.out.println("Coldest: " + findMin(temperatures));
        
        // Student ages
        int[] ages = {15, 14, 16, 13, 15, 14};
        System.out.println("\nStudent ages: " + Arrays.toString(ages));
        System.out.println("Youngest: " + findMin(ages));
    }
}