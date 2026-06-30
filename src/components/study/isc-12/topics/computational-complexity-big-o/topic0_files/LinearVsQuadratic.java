/**
 * Compares a single loop (O(n)) with a nested loop (O(n²)).
 * As n grows, the quadratic version becomes impractical.
 */
public class LinearVsQuadratic {
    public static void main(String[] args) {
        int n = 10_000;

        // --- O(n) Loop ---
        long startLinear = System.nanoTime();
        int sumLinear = 0;
        for (int i = 0; i < n; i++) {
            sumLinear += i;
        }
        long endLinear = System.nanoTime();
        long timeLinear = endLinear - startLinear;

        // --- O(n²) Nested Loop ---
        long startQuadratic = System.nanoTime();
        int sumQuadratic = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                sumQuadratic += i * j;  // dummy operation
            }
        }
        long endQuadratic = System.nanoTime();
        long timeQuadratic = endQuadratic - startQuadratic;

        System.out.println("n = " + n);
        System.out.println("O(n) time: " + timeLinear / 1_000_000 + " ms");
        System.out.println("O(n²) time: " + timeQuadratic / 1_000_000 + " ms");
        System.out.println("Quadratic took " + (timeQuadratic / timeLinear) + "x longer.");
    }
}