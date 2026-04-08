import java.util.Arrays;

public class BinarySearchFirstLast {
    
    // Find first occurrence
    public static int findFirst(int[] arr, int target) {
        if (arr == null) return -1;
        
        int low = 0;
        int high = arr.length - 1;
        int result = -1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (arr[mid] == target) {
                result = mid;      // Found, but continue searching left
                high = mid - 1;    // Look for earlier occurrence
            } else if (target < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        return result;
    }
    
    // Find last occurrence
    public static int findLast(int[] arr, int target) {
        if (arr == null) return -1;
        
        int low = 0;
        int high = arr.length - 1;
        int result = -1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (arr[mid] == target) {
                result = mid;      // Found, but continue searching right
                low = mid + 1;     // Look for later occurrence
            } else if (target < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] numbers = {10, 20, 20, 20, 30, 30, 40, 50, 50, 60};
        
        System.out.println("Array: " + Arrays.toString(numbers));
        
        int target = 20;
        int first = findFirst(numbers, target);
        int last = findLast(numbers, target);
        
        System.out.println("Target: " + target);
        System.out.println("First occurrence at index: " + first);
        System.out.println("Last occurrence at index: " + last);
        System.out.println("Frequency: " + (last - first + 1));
        
        // Student example from Barrackpore school
        int[] rollNos = {101, 102, 103, 103, 103, 104, 105, 106};
        System.out.println("\nRoll numbers: " + Arrays.toString(rollNos));
        System.out.println("First student with roll 103: " + findFirst(rollNos, 103));
        System.out.println("Last student with roll 103: " + findLast(rollNos, 103));
    }
}