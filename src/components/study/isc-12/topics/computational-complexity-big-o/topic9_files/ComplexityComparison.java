/**
 * Compares runtime of O(n), O(n log n), and O(n²) algorithms.
 * Uses small n for demonstration to keep runtime reasonable.
 */
public class ComplexityComparison {
    public static void main(String[] args) {
        int[] sizes = {100, 500, 1000, 2000};
        System.out.println("n\tO(n)\tO(n log n)\tO(n²) (ms)");
        System.out.println("------------------------------------------");

        for (int n : sizes) {
            long start, end;

            // O(n)
            start = System.nanoTime();
            int sum = 0;
            for (int i = 0; i < n; i++) sum += i;
            end = System.nanoTime();
            long timeN = (end - start) / 1_000_000;

            // O(n log n)
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
            long timeNlogN = (end - start) / 1_000_000;

            // O(n²) - using smaller n to keep time manageable, but use same n
            start = System.nanoTime();
            count = 0;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    count++;
                }
            }
            end = System.nanoTime();
            long timeN2 = (end - start) / 1_000_000;

            System.out.printf("%d\t%d\t%d\t\t%d\n", n, timeN, timeNlogN, timeN2);
        }
    }
}