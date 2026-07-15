/**
 * Demonstrates that constants can matter in practice even though Big-O ignores them.
 * An O(n) algorithm with a large constant may be slower than O(n²) for small n.
 */
public class ConstantFactors {
    public static void main(String[] args) {
        int n = 100;
        long start, end;

        // O(n) with large constant: e.g., 10,000 operations per element
        start = System.nanoTime();
        for (int i = 0; i < n; i++) {
            // Simulate 10,000 operations
            long dummy = 0;
            for (int j = 0; j < 10_000; j++) {
                dummy += j;
            }
        }
        end = System.nanoTime();
        long timeN = (end - start) / 1_000_000;

        // O(n²) with small constant: e.g., 1 operation per inner loop
        start = System.nanoTime();
        long count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        end = System.nanoTime();
        long timeN2 = (end - start) / 1_000_000;

        System.out.println("n = " + n);
        System.out.println("O(n) with large constant: " + timeN + " ms");
        System.out.println("O(n²) with small constant: " + timeN2 + " ms");
        System.out.println("For small n, O(n) can be slower than O(n²) due to constants.");

        // Now increase n to see O(n²) dominate
        n = 10_000;
        System.out.println("\nn = " + n);
        // O(n) with large constant would be huge, but we skip it for brevity.
        // Just show that O(n²) time becomes large.
        start = System.nanoTime();
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        end = System.nanoTime();
        long timeN2Large = (end - start) / 1_000_000;
        System.out.println("O(n²) now takes " + timeN2Large + " ms");
    }
}