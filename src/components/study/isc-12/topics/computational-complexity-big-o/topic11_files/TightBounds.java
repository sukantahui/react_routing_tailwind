/**
 * Compares algorithms with and without tight bounds.
 */
public class TightBounds {
    public static void main(String[] args) {
        int[] arr = new int[1000];
        for (int i = 0; i < arr.length; i++) arr[i] = i;

        // Case 1: Always linear — Θ(n)
        System.out.println("Summing array (must visit all): Θ(n)");
        int sum = 0;
        for (int x : arr) sum += x;
        System.out.println("Sum = " + sum);

        // Case 2: Linear search — O(n) and Ω(1), so NOT Θ(n)
        System.out.println("\nLinear search: O(n) worst, Ω(1) best, so NO Θ(n) overall.");
        int target = 999;
        int index = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                index = i;
                break;
            }
        }
        System.out.println("Found at " + index);

        // Case 3: Merge sort — Θ(n log n) in all cases
        System.out.println("\nMerge sort: Θ(n log n) — best, worst, and average are same.");
        // We won't implement merge sort here, but it's a classic example.

        // Case 4: Quicksort — average Θ(n log n), worst O(n²), best Ω(n log n)
        System.out.println("Quicksort: average Θ(n log n), but worst O(n²) and best Ω(n log n)");
        System.out.println("So overall, NO Θ(n log n) for all cases.");
    }
}