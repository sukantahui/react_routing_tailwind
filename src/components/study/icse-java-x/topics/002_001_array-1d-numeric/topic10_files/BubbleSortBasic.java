
public class BubbleSortBasic {
    
    // Basic bubble sort - no optimization
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Number of passes
        for (int i = 0; i < n - 1; i++) {
            // Compare adjacent elements
            for (int j = 0; j < n - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] marks = {64, 34, 25, 12, 22, 11, 90};
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original array: " + "[");
        for (int i = 0; i < marks.length; i++) {
            System.out.print(marks[i] + (i < marks.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(marks);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted array: " + "[");
        for (int i = 0; i < marks.length; i++) {
            System.out.print(marks[i] + (i < marks.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Student scores example - Barrackpore school
        int[] scores = {78, 89, 45, 92, 67, 85};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nStudent scores: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(scores);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted scores: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}