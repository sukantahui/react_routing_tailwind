import java.util.Arrays;

public class FindLargestMultiple {
    
    // Find top 3 largest elements
    public static void findTopThree(int[] arr) {
        if (arr == null || arr.length < 3) {
            System.out.println("Array needs at least 3 elements");
            return;
        }
        
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        int third = Integer.MIN_VALUE;
        
        for (int num : arr) {
            if (num > first) {
                third = second;
                second = first;
                first = num;
            } else if (num > second && num != first) {
                third = second;
                second = num;
            } else if (num > third && num != second && num != first) {
                third = num;
            }
        }
        
        System.out.println("Top 3 largest: " + first + ", " + second + ", " + third);
    }
    
    // Find maximum using tournament style (compare in pairs)
    public static int findMaxTournament(int[] arr, int left, int right) {
        if (left == right) {
            return arr[left];
        }
        
        int mid = left + (right - left) / 2;
        int leftMax = findMaxTournament(arr, left, mid);
        int rightMax = findMaxTournament(arr, mid + 1, right);
        
        return Math.max(leftMax, rightMax);
    }
    
    // Find second largest in one pass
    public static void findFirstAndSecondMax(int[] arr) {
        if (arr == null || arr.length < 2) {
            System.out.println("Need at least 2 elements");
            return;
        }
        
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        
        for (int num : arr) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }
        
        System.out.println("Largest: " + first);
        System.out.println("Second largest: " + second);
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34, 89, 56};
        
        System.out.println("Array: " + Arrays.toString(scores));
        
        System.out.println("\n--- Top 3 Largest ---");
        findTopThree(scores);
        
        System.out.println("\n--- Tournament Method ---");
        int max = findMaxTournament(scores, 0, scores.length - 1);
        System.out.println("Maximum (tournament): " + max);
        
        System.out.println("\n--- First & Second Largest ---");
        findFirstAndSecondMax(scores);
        
        // Student scores from Barrackpore
        int[] studentScores = {85, 92, 78, 96, 88, 91, 84, 95};
        System.out.println("\nBarrackpore School Scores: " + Arrays.toString(studentScores));
        findFirstAndSecondMax(studentScores);
    }
}