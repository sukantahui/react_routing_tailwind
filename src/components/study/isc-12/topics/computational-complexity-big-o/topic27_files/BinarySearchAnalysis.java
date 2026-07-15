/**
 * Compares Binary Search (O(log n)) with Linear Search (O(n)).
 * Shows the dramatic difference in steps for large inputs.
 */
public class BinarySearchAnalysis {
    public static void main(String[] args) {
        int[] sizes = {10, 100, 1000, 10000, 100000, 1000000, 10000000};

        System.out.println("n\t\tBinary Search (log₂ n)\tLinear Search (n)");
        System.out.println("---------------------------------------------------------");

        for (int n : sizes) {
            int binarySteps = (int)(Math.log(n) / Math.log(2)) + 1;
            int linearSteps = n;
            System.out.printf("%d\t\t%d\t\t\t%d\n", n, binarySteps, linearSteps);
        }

        System.out.println("\nFor n = 1,000,000:");
        System.out.println("Binary search: ~20 comparisons");
        System.out.println("Linear search: 1,000,000 comparisons");
        System.out.println("Binary search is 50,000x faster!");

        // Simulate actual search on a large array
        System.out.println("\nSimulating search on array of 1,000,000 elements:");
        int[] arr = new int[1_000_000];
        for (int i = 0; i < arr.length; i++) arr[i] = i;

        // Binary search
        long start = System.nanoTime();
        int result = BinarySearchIterative.binarySearch(arr, 999_999);
        long end = System.nanoTime();
        System.out.println("Binary search time: " + (end - start) + " ns");

        // Linear search
        start = System.nanoTime();
        result = linearSearch(arr, 999_999);
        end = System.nanoTime();
        System.out.println("Linear search time: " + (end - start) + " ns");
    }

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}