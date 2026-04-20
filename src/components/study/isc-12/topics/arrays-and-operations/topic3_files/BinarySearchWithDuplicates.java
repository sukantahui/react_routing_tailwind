public class BinarySearchWithDuplicates {
    // Find first occurrence (leftmost)
    public static int firstOccurrence(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        int result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                result = mid;
                high = mid - 1; // continue searching left
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    }
    
    // Find last occurrence (rightmost)
    public static int lastOccurrence(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        int result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                result = mid;
                low = mid + 1; // continue searching right
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    }
    
    public static void main(String[] args) {
        int[] arr = {2, 5, 5, 5, 6, 6, 8, 9};
        int target = 5;
        System.out.println("First occurrence: " + firstOccurrence(arr, target)); // 1
        System.out.println("Last occurrence: " + lastOccurrence(arr, target));  // 3
    }
}