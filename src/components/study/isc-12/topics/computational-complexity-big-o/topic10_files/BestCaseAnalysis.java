/**
 * Compares best-case and worst-case runtime of linear search.
 * Shows that Ω(1) and O(n) differ.
 */
public class BestCaseAnalysis {
    public static void main(String[] args) {
        int[] arr = new int[1_000_000];
        for (int i = 0; i < arr.length; i++) arr[i] = i;

        // Best case: target at index 0
        long start = System.nanoTime();
        linearSearch(arr, 0);
        long end = System.nanoTime();
        System.out.println("Best case (target at first): " + (end - start) + " ns → Ω(1)");

        // Worst case: target at last or not found
        start = System.nanoTime();
        linearSearch(arr, arr.length + 1); // not found
        end = System.nanoTime();
        System.out.println("Worst case (target not found): " + (end - start) + " ns → O(n)");

        // Average case: target somewhere in the middle
        start = System.nanoTime();
        linearSearch(arr, arr.length / 2);
        end = System.nanoTime();
        System.out.println("Average case (target in middle): " + (end - start) + " ns → Θ(n) average");

        System.out.println("\nConclusion: Linear search has Ω(1), O(n), and Θ(n) on average.");
    }

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}