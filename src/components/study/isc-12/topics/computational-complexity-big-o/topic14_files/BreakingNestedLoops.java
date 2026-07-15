/**
 * Shows that early breaks don't change worst-case complexity.
 * Worst-case is still O(n²) even if best-case can be better.
 */
public class BreakingNestedLoops {
    public static void main(String[] args) {
        int n = 1000;
        int[][] matrix = new int[n][n];
        // Fill with some data, assume all positive
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = i + j;
            }
        }

        // Worst-case: find a negative number (none exist)
        long start = System.nanoTime();
        boolean found = false;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] < 0) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        long end = System.nanoTime();
        System.out.println("Worst-case (no break): " + (end - start) + " ns");

        // Best-case: negative at (0,0)
        matrix[0][0] = -1;
        start = System.nanoTime();
        found = false;
        outer:
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] < 0) {
                    found = true;
                    break outer;
                }
            }
        }
        end = System.nanoTime();
        System.out.println("Best-case (break early): " + (end - start) + " ns");
        System.out.println("Worst-case is still O(n²) even if best-case can be O(1).");
    }
}