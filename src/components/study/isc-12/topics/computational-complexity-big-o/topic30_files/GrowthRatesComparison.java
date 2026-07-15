/**
 * Compares theoretical growth rates (Big-O) with practical measurements.
 * Shows why algorithms with better Big-O are preferred for large n.
 */
public class GrowthRatesComparison {
    public static void main(String[] args) {
        int[] sizes = {10, 100, 1000, 10000, 100000};

        System.out.println("n\tO(n)\tO(n log n)\tO(n²)\t\tO(2ⁿ)");
        System.out.println("------------------------------------------------");

        for (int n : sizes) {
            long linear = n;
            long nLogN = (long)(n * (Math.log(n) / Math.log(2)));
            long quadratic = (long)n * n;
            long exponential = 1L << n; // only for small n

            // Only show exponential for n <= 10 (to avoid overflow)
            String expStr = (n <= 10) ? String.valueOf(exponential) : "too large";

            System.out.printf("%d\t%d\t%d\t%d\t\t%s\n", n, linear, nLogN, quadratic, expStr);
        }

        System.out.println("\nFor n=1,000,000:");
        int n = 1000000;
        long linear = n;
        long nLogN = (long)(n * (Math.log(n) / Math.log(2)));
        long quadratic = (long)n * n;
        System.out.println("O(n) ≈ " + linear + " operations");
        System.out.println("O(n log n) ≈ " + nLogN + " operations");
        System.out.println("O(n²) ≈ " + quadratic + " operations");
        System.out.println("O(n log n) is " + (quadratic / nLogN) + "x faster than O(n²)!");

        // Simulate actual runtime
        System.out.println("\nSimulating algorithm runtime (ns):");
        System.out.println("n\t\tO(n)\tO(n log n)\tO(n²)");
        int[] simSizes = {100, 500, 1000, 2000, 5000};
        for (int s : simSizes) {
            // Simulate O(n) — a simple loop
            long start = System.nanoTime();
            int sum = 0;
            for (int i = 0; i < s; i++) sum += i;
            long timeN = System.nanoTime() - start;

            // Simulate O(n log n) — nested loop with halving
            start = System.nanoTime();
            int count = 0;
            for (int i = 0; i < s; i++) {
                int k = s;
                while (k > 1) {
                    k /= 2;
                    count++;
                }
            }
            long timeNLogN = System.nanoTime() - start;

            // Simulate O(n²) — nested loop
            start = System.nanoTime();
            count = 0;
            for (int i = 0; i < s; i++) {
                for (int j = 0; j < s; j++) {
                    count++;
                }
            }
            long timeN2 = System.nanoTime() - start;

            System.out.printf("%d\t\t%d\t%d\t\t%d\n", s, timeN, timeNLogN, timeN2);
        }
    }
}