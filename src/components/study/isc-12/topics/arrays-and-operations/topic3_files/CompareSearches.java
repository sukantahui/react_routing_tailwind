import java.util.Arrays;

public class CompareSearches {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
    
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int size = 1000000;
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) arr[i] = i; // sorted
        int target = size - 1; // worst-case for both
        
        long start = System.nanoTime();
        linearSearch(arr, target);
        long end = System.nanoTime();
        System.out.println("Linear search: " + (end - start) / 1e6 + " ms");
        
        start = System.nanoTime();
        binarySearch(arr, target);
        end = System.nanoTime();
        System.out.println("Binary search: " + (end - start) / 1e6 + " ms");
        
        // Binary search is dramatically faster for large n
    }
}