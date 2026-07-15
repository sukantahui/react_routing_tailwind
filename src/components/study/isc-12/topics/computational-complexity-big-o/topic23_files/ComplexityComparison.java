/**
 * Compares O(n log n) and O(n²) algorithms for different input sizes.
 * Shows why O(n log n) is preferred for large datasets.
 */
public class ComplexityComparison {
    public static void main(String[] args) {
        int[] sizes = {100, 500, 1000, 2000, 5000};

        System.out.println("Comparing O(n log n) vs O(n²):");
        System.out.println("n\tO(n log n)\tO(n²)\t\tRatio");
        System.out.println("------------------------------------------");

        for (int n : sizes) {
            long nLogN = (long)(n * (Math.log(n) / Math.log(2)));
            long nSquared = (long)n * n;
            double ratio = (double)nSquared / nLogN;

            System.out.printf("%d\t%d\t\t%d\t\t%.1f\n", n, nLogN, nSquared, ratio);
        }

        System.out.println("\nFor n=10,000:");
        int n = 10000;
        long nLogN = (long)(n * (Math.log(n) / Math.log(2)));
        long nSquared = (long)n * n;
        System.out.println("O(n log n): " + nLogN + " operations");
        System.out.println("O(n²): " + nSquared + " operations");
        System.out.println("O(n log n) is " + (nSquared / nLogN) + "x faster!");
    }
}