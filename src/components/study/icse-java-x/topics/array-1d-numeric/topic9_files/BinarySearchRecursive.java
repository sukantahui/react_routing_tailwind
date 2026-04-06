import java.util.Arrays;

public class BinarySearchRecursive {
    
    // Recursive binary search
    public static int binarySearchRecursive(int[] arr, int target, int low, int high) {
        // Base case: element not found
        if (low > high) {
            return -1;
        }
        
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            return mid;  // Found
        } else if (target < arr[mid]) {
            return binarySearchRecursive(arr, target, low, mid - 1);  // Search left
        } else {
            return binarySearchRecursive(arr, target, mid + 1, high); // Search right
        }
    }
    
    // Wrapper method for convenience
    public static int binarySearch(int[] arr, int target) {
        if (arr == null) return -1;
        return binarySearchRecursive(arr, target, 0, arr.length - 1);
    }
    
    public static void main(String[] args) {
        int[] scores = {15, 25, 35, 45, 55, 65, 75, 85, 95};
        
        System.out.println("Array: " + Arrays.toString(scores));
        
        int[] testValues = {55, 100, 15, 95};
        
        for (int target : testValues) {
            int result = binarySearch(scores, target);
            if (result != -1) {
                System.out.println(target + " found at index: " + result);
            } else {
                System.out.println(target + " not found");
            }
        }
    }
}