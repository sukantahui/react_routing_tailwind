
public class SecondLargestBasic {
    
    // Method 1: Using sorting (simplest)
    public static int findSecondLargestBySorting(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        int[] sorted = arr.clone();
        bubbleSort(arr);
        
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
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Array: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Second largest (sorting): " + findSecondLargestBySorting(scores));
        System.out.println("Second largest (two-pass): " + findSecondLargestTwoPass(scores));
        
        // Barrackpore school toppers
        int[] examScores = {78, 92, 85, 96, 67, 88, 91};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nExam scores: " + "[");
        for (int i = 0; i < examScores.length; i++) {
            System.out.print(examScores[i] + (i < examScores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Second highest score: " + findSecondLargestTwoPass(examScores));
        
        // Test with duplicates
        int[] duplicates = {100, 100, 90, 80, 70};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nWith duplicates: " + "[");
        for (int i = 0; i < duplicates.length; i++) {
            System.out.print(duplicates[i] + (i < duplicates.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Second largest: " + findSecondLargestTwoPass(duplicates));
    }
}