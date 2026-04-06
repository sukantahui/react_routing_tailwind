import java.util.Arrays;

public class BinarySearchBasic {
    
    // Iterative binary search
    public static int binarySearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }
        
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high) {
            // Prevent overflow
            int mid = low + (high - low) / 2;
            
            if (arr[mid] == target) {
                return mid;  // Found
            } else if (target < arr[mid]) {
                high = mid - 1;  // Search left half
            } else {
                low = mid + 1;   // Search right half
            }
        }
        
        return -1;  // Not found
    }
    
    public static void main(String[] args) {
        int[] marks = {12, 23, 34, 45, 56, 67, 78, 89, 90};
        
        System.out.println("Array: " + Arrays.toString(marks));
        
        int searchFor = 67;
        int result = binarySearch(marks, searchFor);
        
        if (result != -1) {
            System.out.println(searchFor + " found at index: " + result);
        } else {
            System.out.println(searchFor + " not found");
        }
        
        // Search for non-existent value
        System.out.println("Searching for 100: " + binarySearch(marks, 100));
    }
}