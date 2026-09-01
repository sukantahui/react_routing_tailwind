
public class FindSmallestBasic {
    
    // Find minimum element in array
    public static int findMin(int[] arr) {
        // Handle empty array
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array cannot be empty");
        }
        
        int min = arr[0];  // Assume first element is smallest
        
        // Start from index 1 (already compared index 0)
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {  // Note: < operator for minimum
                min = arr[i];     // Found new minimum
            }
        }
        
        return min;
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 23, 89, 12, 78, 34};
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Array: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Smallest element: " + findMin(scores));
        
        // Barrackpore school exam scores - find lowest
        int[] examScores = {78, 92, 85, 96, 67, 88, 91};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nExam scores: " + "[");
        for (int i = 0; i < examScores.length; i++) {
            System.out.print(examScores[i] + (i < examScores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Lowest score: " + findMin(examScores));
        
        // Negative numbers test
        int[] temperatures = {-5, -12, -3, -8, -1};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nTemperatures: " + "[");
        for (int i = 0; i < temperatures.length; i++) {
            System.out.print(temperatures[i] + (i < temperatures.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Coldest: " + findMin(temperatures));
        
        // Student ages
        int[] ages = {15, 14, 16, 13, 15, 14};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nStudent ages: " + "[");
        for (int i = 0; i < ages.length; i++) {
            System.out.print(ages[i] + (i < ages.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("Youngest: " + findMin(ages));
    }
}