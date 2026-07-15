/**
 * Demonstrates standard nested loops and their complexities.
 */
public class NestedLoopDemo {
    public static void main(String[] args) {
        int n = 100;

        // O(n²) — independent loops
        System.out.println("O(n²): Both loops run n times");
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        System.out.println("Iterations: " + count + " (should be " + n*n + ")");

        // O(n·m) — different sizes
        int m = 50;
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                count++;
            }
        }
        System.out.println("O(n·m) with n=" + n + ", m=" + m + ": " + count + " iterations");
    }
}