import java.util.Arrays;

public class BinarySearchInsertionPoint {
    
    // Find insertion point (where element would be inserted)
    public static int findInsertionPoint(int[] arr, int target) {
        if (arr == null) return 0;
        
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (arr[mid] == target) {
                return mid;  // Element exists, insert at same position
            } else if (target < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        return low;  // Insertion point
    }
    
    // Insert element maintaining sorted order
    public static int[] insertElement(int[] arr, int element) {
        int pos = findInsertionPoint(arr, element);
        int[] newArr = new int[arr.length + 1];
        
        // Copy elements before insertion point
        for (int i = 0; i < pos; i++) {
            newArr[i] = arr[i];
        }
        
        // Insert new element
        newArr[pos] = element;
        
        // Copy remaining elements
        for (int i = pos; i < arr.length; i++) {
            newArr[i + 1] = arr[i];
        }
        
        return newArr;
    }
    
    public static void main(String[] args) {
        int[] scores = {10, 20, 30, 40, 50, 60};
        
        System.out.println("Original array: " + Arrays.toString(scores));
        
        int[] testElements = {25, 5, 65, 30};
        
        for (int elem : testElements) {
            int insertionPoint = findInsertionPoint(scores, elem);
            System.out.println("Insert " + elem + " at index: " + insertionPoint);
        }
        
        // Insert 35 into array
        int[] newScores = insertElement(scores, 35);
        System.out.println("\nAfter inserting 35: " + Arrays.toString(newScores));
        
        // Student grades example
        int[] grades = {65, 70, 75, 80, 85, 90};
        int tuhinasGrade = 82;
        int pos = findInsertionPoint(grades, tuhinasGrade);
        System.out.println("\nTuhina's grade " + tuhinasGrade + 
                           " would be inserted at position " + pos);
    }
}