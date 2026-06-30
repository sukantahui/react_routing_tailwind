/**
 * Compares runtime of different complexity classes in practice.
 * Uses small n to keep runtime manageable.
 */
public class ComparingClasses {
    public static void main(String[] args) {
        int n = 10000;

        System.out.println("Comparing runtime for n = " + n);
        System.out.println("--------------------------------");

        // O(n) — Linear
        long start = System.nanoTime();
        int sum = 0;
        for (int i = 0; i < n; i++) sum += i;
        long end = System.nanoTime();
        System.out.println("O(n): " + (end - start) + " ns");

        // O(n log n) — Linearithmic (simulated)
        start = System.nanoTime();
        int count = 0;
        for (int i = 0; i < n; i++) {
            int k = n;
            while (k > 1) {
                k /= 2;
                count++;
            }
        }
        end = System.nanoTime();
        System.out.println("O(n log n): " + (end - start) + " ns");

        // O(n²) — Quadratic (using smaller n to keep it reasonable)
        System.out.println("\nFor n², using n=500 to keep runtime manageable:");
        int smallN = 500;
        start = System.nanoTime();
        count = 0;
        for (int i = 0; i < smallN; i++) {
            for (int j = 0; j < smallN; j++) {
                count++;
            }
        }
        end = System.nanoTime();
        System.out.println("O(n²) (n=" + smallN + "): " + (end - start) + " ns");

        System.out.println("\nO(n) is much faster than O(n²) for large n!");
    }
}