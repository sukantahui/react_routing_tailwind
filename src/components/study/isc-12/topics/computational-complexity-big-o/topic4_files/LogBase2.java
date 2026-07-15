/**
 * Computes log base 2 of integers using:
 * 1. Change of base formula with Math.log
 * 2. Bit manipulation for exact powers of 2
 */
public class LogBase2 {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024};

        System.out.println("Using change of base formula:");
        for (int n : numbers) {
            double log2 = Math.log(n) / Math.log(2);
            System.out.println("log2(" + n + ") = " + log2);
        }

        System.out.println("\nUsing bit shift (only for powers of 2):");
        for (int n : numbers) {
            // For powers of 2, log2(n) = number of trailing zeros
            int log2 = Integer.numberOfTrailingZeros(n);
            System.out.println("log2(" + n + ") = " + log2);
        }

        // For general integers, we can use Integer.highestOneBit and trailing zeros
        int n = 100;
        int log2Floor = (int)(Math.log(n) / Math.log(2)); // floor of log2
        System.out.println("\nFloor log2(" + n + ") = " + log2Floor);
    }
}