/**
 * Compares the number of operations for different complexity classes.
 * Shows the vast differences in growth rates.
 */
public class GrowthRates {
    public static void main(String[] args) {
        int[] sizes = {1, 2, 4, 8, 16, 32, 64};

        System.out.println("n\tlog n\tn\tn log n\tn²\t2ⁿ\t\tn!");
        System.out.println("----------------------------------------------------------------");

        for (int n : sizes) {
            long logN = (long)(Math.log(n) / Math.log(2));
            long nLogN = (long)(n * logN);
            long nSquared = (long)n * n;
            long twoPowN = 1L << n; // 2^n
            long factorial = factorial(n);

            System.out.printf("%d\t%d\t%d\t%d\t%d\t%d\t\t%d\n",
                n, logN, n, nLogN, nSquared, twoPowN, factorial);
        }

        System.out.println("\nNotice how 2ⁿ and n! grow incredibly fast!");
    }

    public static long factorial(int n) {
        long result = 1;
        for (int i = 1; i <= n; i++) result *= i;
        return result;
    }
}