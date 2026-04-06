import java.util.Arrays;

public class BubbleSortDescending {
    
    // Basic descending bubble sort
    public static void bubbleSortDescending(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1; j++) {
                // Swap if left element is SMALLER than right (for descending)
                if (arr[j] < arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] scores = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array: " + Arrays.toString(scores));
        bubbleSortDescending(scores);
        System.out.println("Descending order: " + Arrays.toString(scores));
        
        // Barrackpore school high scores
        int[] highScores = {78, 92, 85, 67, 95, 88, 91};
        System.out.println("\nStudent high scores: " + Arrays.toString(highScores));
        bubbleSortDescending(highScores);
        System.out.println("Ranked scores (highest first): " + Arrays.toString(highScores));
    }
}