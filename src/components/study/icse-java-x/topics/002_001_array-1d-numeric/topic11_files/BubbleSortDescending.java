
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
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original array: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortDescending(scores);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Descending order: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Barrackpore school high scores
        int[] highScores = {78, 92, 85, 67, 95, 88, 91};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nStudent high scores: " + "[");
        for (int i = 0; i < highScores.length; i++) {
            System.out.print(highScores[i] + (i < highScores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortDescending(highScores);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Ranked scores (highest first): " + "[");
        for (int i = 0; i < highScores.length; i++) {
            System.out.print(highScores[i] + (i < highScores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}