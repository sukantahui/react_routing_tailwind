/**
 * Simulates binary search and displays the halving process step by step.
 */
public class BinarySearchCount {
    public static void main(String[] args) {
        int size = 1024;
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) arr[i] = i + 1; // 1..1024

        int target = 723; // some target
        binarySearchWithSteps(arr, target);

        // Also show for different sizes
        System.out.println("\nMax steps for given array sizes:");
        for (int n : new int[]{10, 100, 1000, 10000, 100000, 1_000_000}) {
            int maxSteps = (int)(Math.log(n) / Math.log(2)) + 1;
            System.out.println("n = " + n + " -> max " + maxSteps + " steps");
        }
    }

    public static int binarySearchWithSteps(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        int steps = 0;

        System.out.println("Searching for " + target + " in array of size " + arr.length);

        while (low <= high) {
            steps++;
            int mid = low + (high - low) / 2;
            System.out.println("Step " + steps + ": low=" + low + ", high=" + high + ", mid=" + mid +
                    ", value=" + arr[mid]);

            if (arr[mid] == target) {
                System.out.println("Found target at index " + mid + " in " + steps + " steps.");
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
                System.out.println("  -> target > mid, discarding left half");
            } else {
                high = mid - 1;
                System.out.println("  -> target < mid, discarding right half");
            }
        }
        System.out.println("Target not found after " + steps + " steps.");
        return -1;
    }
}