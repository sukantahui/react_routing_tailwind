import java.util.Arrays;

public class SecondLargestSinglePass {
    
    // Optimal single pass solution
    public static int findSecondLargest(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        int first = arr[0];
        int second = Integer.MIN_VALUE;
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > first) {
                second = first;
                first = arr[i];
            } else if (arr[i] > second && arr[i] != first) {
                second = arr[i];
            }
        }
        
        if (second == Integer.MIN_VALUE) {
            throw new IllegalArgumentException("No second largest element found");
        }
        
        return second;
    }
    
    // Find top K largest using single pass (for K=2,3,etc.)
    public static int[] findTopK(int[] arr, int k) {
        if (arr == null || arr.length < k) {
            throw new IllegalArgumentException("Array must have at least " + k + " elements");
        }
        
        int[] top = new int[k];
        Arrays.fill(top, Integer.MIN_VALUE);
        
        for (int num : arr) {
            for (int i = 0; i < k; i++) {
                if (num > top[i]) {
                    // Shift smaller values down
                    for (int j = k - 1; j > i; j--) {
                        top[j] = top[j - 1];
                    }
                    top[i] = num;
                    break;
                } else if (num == top[i]) {
                    break; // Skip duplicates
                }
            }
        }
        
        return top;
    }
    
    // With detailed step-by-step output
    public static void findSecondLargestWithTrace(int[] arr) {
        if (arr == null || arr.length < 2) {
            System.out.println("Array must have at least 2 elements");
            return;
        }
        
        int first = arr[0];
        int second = Integer.MIN_VALUE;
        
        System.out.println("Starting search for first and second largest...");
        System.out.println("Initial: first = " + first + ", second = " + second);
        System.out.println();
        
        for (int i = 1; i < arr.length; i++) {
            System.out.println("Checking arr[" + i + "] = " + arr[i]);
            
            if (arr[i] > first) {
                System.out.println("  " + arr[i] + " > " + first + " → New largest found!");
                second = first;
                first = arr[i];
                System.out.println("  Updated: first = " + first + ", second = " + second);
            } else if (arr[i] > second && arr[i] != first) {
                System.out.println("  " + arr[i] + " is between " + second + " and " + first);
                second = arr[i];
                System.out.println("  Updated: second = " + second);
            } else {
                System.out.println("  No update needed");
            }
            System.out.println();
        }
        
        System.out.println("✓ Final result:");
        System.out.println("  First largest: " + first);
        System.out.println("  Second largest: " + second);
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34};
        
        System.out.println("Array: " + Arrays.toString(scores));
        System.out.println("Second largest: " + findSecondLargest(scores));
        
        System.out.println("\n" + "=".repeat(50));
        findSecondLargestWithTrace(scores);
        
        // Find top 3 largest
        int[] top3 = findTopK(scores, 3);
        System.out.println("\nTop 3 largest: " + Arrays.toString(top3));
        
        // Find top 5 from student scores
        int[] studentScores = {85, 92, 78, 96, 88, 91, 84, 95, 87, 90};
        System.out.println("\nAll scores: " + Arrays.toString(studentScores));
        int[] top5 = findTopK(studentScores, 5);
        System.out.println("Top 5 scores: " + Arrays.toString(top5));
    }
}