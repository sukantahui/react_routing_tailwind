/**
 * Finding maximum and minimum in an unsorted array.
 * This requires checking every element, so it's O(n).
 * This is the lower bound — you can't do better without sorting or additional structure.
 */
public class FindMaxMin {
    public static void main(String[] args) {
        int[] arr = {3, 7, 2, 9, 5, 1, 8, 4, 6};
        System.out.println("Array: 3, 7, 2, 9, 5, 1, 8, 4, 6");

        // Find maximum — O(n)
        long start = System.nanoTime();
        int max = findMax(arr);
        long end = System.nanoTime();
        System.out.println("Max: " + max + " (O(n), " + (end - start) + " ns)");

        // Find minimum — O(n)
        start = System.nanoTime();
        int min = findMin(arr);
        end = System.nanoTime();
        System.out.println("Min: " + min + " (O(n), " + (end - start) + " ns)");

        // Find both in one pass — still O(n)
        start = System.nanoTime();
        int[] result = findMaxMin(arr);
        end = System.nanoTime();
        System.out.println("Max: " + result[0] + ", Min: " + result[1] + " (O(n), " + (end - start) + " ns)");

        System.out.println("\nThese operations must visit every element, so they are Ω(n) (lower bound).");
        System.out.println("You cannot find the max/min without checking all elements.");
    }

    public static int findMax(int[] arr) {
        int max = arr[0];
        for (int x : arr) {
            if (x > max) max = x;
        }
        return max;
    }

    public static int findMin(int[] arr) {
        int min = arr[0];
        for (int x : arr) {
            if (x < min) min = x;
        }
        return min;
    }

    public static int[] findMaxMin(int[] arr) {
        int max = arr[0], min = arr[0];
        for (int x : arr) {
            if (x > max) max = x;
            if (x < min) min = x;
        }
        return new int[]{max, min};
    }
}