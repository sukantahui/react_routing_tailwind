
public class SelectionSortDescending {
    
    // Basic descending selection sort
    public static void selectionSortDescending(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            // Find maximum element in unsorted portion
            int maxIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j] > arr[maxIndex]) {  // Note: > for descending
                    maxIndex = j;
                }
            }
            
            // Swap maximum with first element of unsorted portion
            if (maxIndex != i) {
                int temp = arr[i];
                arr[i] = arr[maxIndex];
                arr[maxIndex] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11, 90, 34};
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original array: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSortDescending(numbers);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Descending order: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Barrackpore school highest scores first
        int[] scores = {78, 92, 85, 96, 67, 88, 91};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nStudent scores: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSortDescending(scores);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Ranked (highest first): " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}