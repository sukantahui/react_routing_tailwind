import java.util.Arrays;

public class FindSmallestMultiple {
    
    // Find both minimum and maximum in one pass
    public static void findMinAndMax(int[] arr) {
        if (arr == null || arr.length == 0) {
            System.out.println("Array is empty");
            return;
        }
        
        int min = arr[0];
        int max = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        
        System.out.println("Minimum: " + min);
        System.out.println("Maximum: " + max);
        System.out.println("Range: " + (max - min));
    }
    
    // Find bottom 3 smallest elements
    public static void findBottomThree(int[] arr) {
        if (arr == null || arr.length < 3) {
            System.out.println("Array needs at least 3 elements");
            return;
        }
        
        int first = Integer.MAX_VALUE;
        int second = Integer.MAX_VALUE;
        int third = Integer.MAX_VALUE;
        
        for (int num : arr) {
            if (num < first) {
                third = second;
                second = first;
                first = num;
            } else if (num < second && num != first) {
                third = second;
                second = num;
            } else if (num < third && num != second && num != first) {
                third = num;
            }
        }
        
        System.out.println("Bottom 3 smallest: " + first + ", " + second + ", " + third);
    }
    
    // Find minimum using tournament style (divide and conquer)
    public static int findMinTournament(int[] arr, int left, int right) {
        if (left == right) {
            return arr[left];
        }
        
        int mid = left + (right - left) / 2;
        int leftMin = findMinTournament(arr, left, mid);
        int rightMin = findMinTournament(arr, mid + 1, right);
        
        return Math.min(leftMin, rightMin);
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34, 5, 56};
        
        System.out.println("Array: " + Arrays.toString(scores));
        
        System.out.println("\n--- Min and Max Together ---");
        findMinAndMax(scores);
        
        System.out.println("\n--- Bottom 3 Smallest ---");
        findBottomThree(scores);
        
        System.out.println("\n--- Tournament Method ---");
        int min = findMinTournament(scores, 0, scores.length - 1);
        System.out.println("Minimum (tournament): " + min);
        
        // Student scores from Barrackpore - find lowest for improvement
        int[] studentScores = {85, 92, 78, 96, 67, 88, 91, 84};
        System.out.println("\nBarrackpore School Scores: " + Arrays.toString(studentScores));
        findMinAndMax(studentScores);
        System.out.println("Need improvement (below 70): " + 
            (findMinTournament(studentScores, 0, studentScores.length - 1) < 70 ? "Yes" : "No"));
    }
}