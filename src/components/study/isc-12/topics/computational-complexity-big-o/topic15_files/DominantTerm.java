/**
 * Demonstrates combining O(n²) and O(n) loops — the quadratic dominates.
 * Complexity: O(n²) + O(n) = O(n²).
 */
public class DominantTerm {
    public static void main(String[] args) {
        int n = 1000;

        System.out.println("Dominant term: O(n²) + O(n) = O(n²)");
        long start, end;

        // O(n²) nested loop
        start = System.nanoTime();
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        end = System.nanoTime();
        System.out.println("O(n²) took " + (end - start) + " ns");

        // O(n) linear loop
        start = System.nanoTime();
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i;
        }
        end = System.nanoTime();
        System.out.println("O(n) took " + (end - start) + " ns");

        // Total time is dominated by O(n²).
        System.out.println("\nThe total complexity is O(n²) because it grows much faster.");
    }
}