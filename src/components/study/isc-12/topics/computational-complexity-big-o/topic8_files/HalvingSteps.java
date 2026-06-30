/**
 * Prints the number of halving steps for various input sizes,
 * showing how slowly it grows (logarithmic).
 */
public class HalvingSteps {
    public static void main(String[] args) {
        System.out.println("n\t\tsteps (halving to 1)");
        System.out.println("----------------------------------");

        for (int power = 1; power <= 30; power++) {
            long n = 1L << power; // 2^power
            int steps = countHalvingSteps(n);
            System.out.println("2^" + power + " = " + n + "\t" + steps);
        }

        // Compare with linear growth
        System.out.println("\nFor n = 1,000,000,000:");
        int steps = countHalvingSteps(1_000_000_000L);
        System.out.println("Halving steps: " + steps);
        System.out.println("Linear steps would be 1,000,000,000");
        System.out.println("Halving is " + (1_000_000_000 / steps) + "x faster in terms of steps.");
    }

    public static int countHalvingSteps(long n) {
        if (n <= 0) return -1;
        int steps = 0;
        while (n > 1) {
            n /= 2;
            steps++;
        }
        return steps;
    }
}