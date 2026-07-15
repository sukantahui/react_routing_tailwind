/**
 * Compares the runtime of different time complexities:
 * - O(n) – Linear loop
 * - O(n) – Linear loop with constant inner work
 * - O(n²) – True quadratic nested loop
 */
public class TimeComplexityDemo {
    public static void main(String[] args) {
        int n = 100000;
        long start, end;

        // ─── 1. O(n) Linear Loop ─────────────────────────────────────────────
        start = System.nanoTime();
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i;
        }
        end = System.nanoTime();
        System.out.println("O(n) time: " + (end - start) / 1_000_000 + " ms");

        // ─── 2. O(n) with constant inner loop ──────────────────────────────
        start = System.nanoTime();
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 10; j++) { // Inner loop runs constant 10 times
                count++;
            }
        }
        end = System.nanoTime();
        System.out.println("O(n) with constant 10 inner loop: " + (end - start) / 1_000_000 + " ms");

        // ─── 3. O(n²) True Quadratic Loop ────────────────────────────────────
        // Using n=10000 to keep the runtime manageable for demonstration
        n = 10000;
        start = System.nanoTime();
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        end = System.nanoTime();
        System.out.println("O(n²) time (n=" + n + "): " + (end - start) / 1_000_000 + " ms");
    }
}