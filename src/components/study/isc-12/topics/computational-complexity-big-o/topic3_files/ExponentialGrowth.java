/**
 * Prints powers of 2 from n=0 to n=30,
 * showing the rapid growth of exponential functions.
 */
public class ExponentialGrowth {
    public static void main(String[] args) {
        System.out.println("n\t2^n");
        System.out.println("----------------");
        for (int n = 0; n <= 30; n++) {
            // Using long to hold values (2^30 fits in long)
            long value = 1L << n; // bit shift for power of 2
            System.out.println(n + "\t" + value);
        }

        // Also show how quickly it grows
        System.out.println("\nNotice how 2^10 = 1024, 2^20 ≈ 1 million, 2^30 ≈ 1 billion.");
        System.out.println("This is why O(2^n) algorithms become infeasible quickly.");
    }
}