/**
 * Linear Search — O(n) time.
 * Checks each element one by one until the target is found or the end is reached.
 * Worst case: target at the end or not found → O(n)
 * Best case: target at the first position → O(1)
 * Average: O(n)
 */
public class LinearSearch {
    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 9, 3, 7, 4, 6};

        System.out.println("Linear Search (O(n))");
        System.out.println("Array: 5, 2, 8, 1, 9, 3, 7, 4, 6");

        // Search for a value present
        int target = 9;
        int index = linearSearch(arr, target);
        System.out.println("Target " + target + " found at index " + index);

        // Search for a value not present
        target = 10;
        index = linearSearch(arr, target);
        System.out.println("Target " + target + " found at index " + index);

        // Show worst-case comparisons
        System.out.println("\nWorst-case comparisons: n = " + arr.length);
        System.out.println("In the worst case, linear search checks all " + arr.length + " elements.");
    }

    public static int linearSearch(int[] arr, int target) {
        int comparisons = 0;
        for (int i = 0; i < arr.length; i++) {
            comparisons++;
            if (arr[i] == target) {
                System.out.println("Found after " + comparisons + " comparisons.");
                return i;
            }
        }
        System.out.println("Not found after " + comparisons + " comparisons.");
        return -1;
    }
}