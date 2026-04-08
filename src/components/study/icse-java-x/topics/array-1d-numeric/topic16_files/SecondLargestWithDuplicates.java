import java.util.Arrays;

public class SecondLargestWithDuplicates {
    
    // Handle duplicates carefully
    public static int findSecondLargest(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        
        for (int num : arr) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                // Important: num != first handles duplicates
                second = num;
            }
        }
        
        if (second == Integer.MIN_VALUE) {
            throw new IllegalArgumentException("No second largest element (all elements may be equal or array too small)");
        }
        
        return second;
    }
    
    // Also return indices of first and second largest
    public static int[] findFirstAndSecondIndices(int[] arr) {
        if (arr == null || arr.length < 2) {
            return new int[]{-1, -1};
        }
        
        int firstIdx = 0;
        int secondIdx = -1;
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > arr[firstIdx]) {
                secondIdx = firstIdx;
                firstIdx = i;
            } else if (secondIdx == -1 || (arr[i] > arr[secondIdx] && arr[i] != arr[firstIdx])) {
                secondIdx = i;
            }
        }
        
        return new int[]{firstIdx, secondIdx};
    }
    
    public static void main(String[] args) {
        // Test with various scenarios
        int[][] testCases = {
            {45, 67, 23, 89, 12, 78, 34},
            {100, 100, 90, 80, 70},
            {5, 5, 5, 5},
            {-5, -10, -3, -8},
            {1}
        };
        
        for (int[] test : testCases) {
            System.out.println("\nArray: " + Arrays.toString(test));
            try {
                int second = findSecondLargest(test);
                System.out.println("Second largest: " + second);
                
                int[] indices = findFirstAndSecondIndices(test);
                if (indices[1] != -1) {
                    System.out.println("First at index " + indices[0] + " (value " + test[indices[0]] + ")");
                    System.out.println("Second at index " + indices[1] + " (value " + test[indices[1]] + ")");
                } else {
                    System.out.println("No second largest exists");
                }
            } catch (IllegalArgumentException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
        
        // Student scores from Barrackpore
        int[] studentScores = {85, 92, 78, 96, 96, 88, 91};
        System.out.println("\nBarrackpore School Scores: " + Arrays.toString(studentScores));
        System.out.println("Second topper: " + findSecondLargest(studentScores));
        
        int[] indices = findFirstAndSecondIndices(studentScores);
        System.out.println("Topper at index " + indices[0] + " with score " + studentScores[indices[0]]);
        System.out.println("Runner-up at index " + indices[1] + " with score " + studentScores[indices[1]]);
    }
}