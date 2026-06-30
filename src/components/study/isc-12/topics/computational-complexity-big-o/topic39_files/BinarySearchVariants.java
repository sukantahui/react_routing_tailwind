/**
 * Binary Search Variants: Find first and last occurrence of a target
 * in a sorted array with duplicates.
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) for recursive, O(1) for iterative
 */
public class BinarySearchVariants {
    private static int callCount = 0;

    public static void main(String[] args) {
        int[] arr = {1, 3, 3, 3, 5, 5, 7, 7, 7, 7, 9, 11};
        int target = 7;

        System.out.println("=== Binary Search Variants ===");
        System.out.println("Array: " + arrayToString(arr));
        System.out.println("Target: " + target);
        System.out.println();

        // Standard binary search (any occurrence)
        callCount = 0;
        int any = binarySearch(arr, target, 0, arr.length - 1);
        System.out.println("Any occurrence: index " + any + " (calls: " + callCount + ")");

        // First occurrence
        callCount = 0;
        int first = firstOccurrence(arr, target, 0, arr.length - 1);
        System.out.println("First occurrence: index " + first + " (calls: " + callCount + ")");

        // Last occurrence
        callCount = 0;
        int last = lastOccurrence(arr, target, 0, arr.length - 1);
        System.out.println("Last occurrence: index " + last + " (calls: " + callCount + ")");

        // Count occurrences
        if (first != -1 && last != -1) {
            System.out.println("Total occurrences: " + (last - first + 1));
        }

        // Show time complexity
        System.out.println("\nAll variants are O(log n) time, O(log n) space (recursive).");
        System.out.println("Iterative versions would be O(1) space.");
    }

    // Standard binary search (any occurrence)
    public static int binarySearch(int[] arr, int target, int low, int high) {
        callCount++;
        if (low > high) return -1;
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return binarySearch(arr, target, mid + 1, high);
        return binarySearch(arr, target, low, mid - 1);
    }

    // Find first occurrence (continue searching left after finding target)
    public static int firstOccurrence(int[] arr, int target, int low, int high) {
        callCount++;
        if (low > high) return -1;
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            // Check if this is the first occurrence
            if (mid == low || arr[mid - 1] != target) {
                return mid;
            }
            // Search left
            return firstOccurrence(arr, target, low, mid - 1);
        }
        if (arr[mid] < target) {
            return firstOccurrence(arr, target, mid + 1, high);
        }
        return firstOccurrence(arr, target, low, mid - 1);
    }

    // Find last occurrence (continue searching right after finding target)
    public static int lastOccurrence(int[] arr, int target, int low, int high) {
        callCount++;
        if (low > high) return -1;
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            // Check if this is the last occurrence
            if (mid == high || arr[mid + 1] != target) {
                return mid;
            }
            // Search right
            return lastOccurrence(arr, target, mid + 1, high);
        }
        if (arr[mid] < target) {
            return lastOccurrence(arr, target, mid + 1, high);
        }
        return lastOccurrence(arr, target, low, mid - 1);
    }

    public static String arrayToString(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
}