import java.util.Arrays;

public class SecondLargestBasic {
    
    // Method 1: Using sorting (simplest)
    public static int findSecondLargestBySorting(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        
        // Find first element different from largest
        int largest = sorted[sorted.length - 1];
        for (int i = sorted.length - 2; i >= 0; i--) {
            if (sorted[i] != largest) {
                return sorted[i];
            }
        }
        
        throw new IllegalArgumentException("No second largest element (all elements equal)");
    }
    
    // Method 2: Two-pass method
    public static int findSecondLargestTwoPass(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        // First pass: find largest
        int largest = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > largest) {
                largest = arr[i];
            }
        }
        
        // Second pass: find largest less than largest
        int secondLargest = Integer.MIN_VALUE;
        for (int num : arr) {
            if (num != largest && num > secondLargest) {
                secondLargest = num;
            }
        }
        
        if (secondLargest == Integer.MIN_VALUE) {
            throw new IllegalArgumentException("No second largest element (all elements equal to largest)");
        }
        
        return secondLargest;
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34};
        
        System.out.println("Array: " + Arrays.toString(scores));
        System.out.println("Second largest (sorting): " + findSecondLargestBySorting(scores));
        System.out.println("Second largest (two-pass): " + findSecondLargestTwoPass(scores));
        
        // Barrackpore school toppers
        int[] examScores = {78, 92, 85, 96, 67, 88, 91};
        System.out.println("\nExam scores: " + Arrays.toString(examScores));
        System.out.println("Second highest score: " + findSecondLargestTwoPass(examScores));
        
        // Test with duplicates
        int[] duplicates = {100, 100, 90, 80, 70};
        System.out.println("\nWith duplicates: " + Arrays.toString(duplicates));
        System.out.println("Second largest: " + findSecondLargestTwoPass(duplicates));
    }
}