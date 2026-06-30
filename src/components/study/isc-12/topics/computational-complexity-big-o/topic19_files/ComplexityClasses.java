/**
 * Demonstrates code examples for each complexity class.
 */
public class ComplexityClasses {
    public static void main(String[] args) {
        int n = 100;

        // O(1) — Constant
        System.out.println("O(1): Array access");
        int[] arr = new int[n];
        int x = arr[0]; // Always 1 operation

        // O(log n) — Logarithmic
        System.out.println("O(log n): Binary search");
        int target = 50;
        binarySearch(arr, target);

        // O(n) — Linear
        System.out.println("O(n): Sum of array");
        int sum = 0;
        for (int i = 0; i < n; i++) sum += i;

        // O(n log n) — Linearithmic
        System.out.println("O(n log n): Merge sort (conceptual)");
        // mergeSort would be called here

        // O(n²) — Quadratic
        System.out.println("O(n²): Nested loop");
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        System.out.println("  Iterations: " + count);

        // O(n³) — Cubic
        System.out.println("O(n³): Three nested loops");
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < n; k++) {
                    count++;
                }
            }
        }
        System.out.println("  Iterations: " + count);

        // O(2ⁿ) — Exponential (only for small n)
        System.out.println("O(2ⁿ): Subset generation (conceptual)");
        // Would call a function that generates all subsets

        // O(n!) — Factorial (only for very small n)
        System.out.println("O(n!): Permutation generation (conceptual)");
    }

    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}