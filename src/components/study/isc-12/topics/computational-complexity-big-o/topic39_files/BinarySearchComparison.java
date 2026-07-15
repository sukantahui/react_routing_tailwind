/**
 * Compares recursive and iterative binary search.
 * Both are O(log n) time, but space differs: recursive O(log n), iterative O(1).
 */
public class BinarySearchComparison {
    public static void main(String[] args) {
        int size = 1000000;
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) arr[i] = i;
        int target = size - 1;

        System.out.println("=== Binary Search Comparison ===");
        System.out.println("Array size: " + size);
        System.out.println("Target: " + target);
        System.out.println();

        // Recursive
        long start = System.nanoTime();
        int recResult = RecursiveBinarySearch.binarySearch(arr, target, 0, arr.length - 1);
        long end = System.nanoTime();
        System.out.println("Recursive: " + recResult + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(log n), Space: O(log n)");

        // Iterative
        start = System.nanoTime();
        int iterResult = iterativeBinarySearch(arr, target);
        end = System.nanoTime();
        System.out.println("Iterative: " + iterResult + " (time: " + (end - start) + " ns)");
        System.out.println("  Time: O(log n), Space: O(1)");

        // Both should be equal
        System.out.println("\nBoth methods give the same result: " + (recResult == iterResult));

        // Show steps for different sizes
        System.out.println("\nSteps for different array sizes:");
        for (int n : new int[]{10, 100, 1000, 10000, 100000, 1000000}) {
            int[] testArr = new int[n];
            for (int i = 0; i < n; i++) testArr[i] = i;
            int steps = iterativeSteps(testArr, n - 1);
            System.out.println("n=" + n + " → " + steps + " steps");
        }
        System.out.println("Steps grow logarithmically: log₂(n) + 1.");
    }

    // Iterative binary search
    public static int iterativeBinarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    // Count steps for iterative binary search
    public static int iterativeSteps(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        int steps = 0;

        while (low <= high) {
            steps++;
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return steps;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return steps;
    }
}