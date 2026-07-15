/**
 * Counts how many times you can divide a number by 2 until it becomes 1.
 * This is exactly floor(log2(n)) for n > 0.
 */
public class RepeatedDivision {
    public static void main(String[] args) {
        long[] numbers = {1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1000, 1_000_000};

        for (long n : numbers) {
            int steps = countHalvingSteps(n);
            System.out.println("n = " + n + ", steps to reach 1: " + steps);
        }

        // For 1 billion
        long large = 1_000_000_000L;
        int steps = countHalvingSteps(large);
        System.out.println("\nn = " + large + ", steps: " + steps);
        System.out.println("Expected log2(" + large + ") ≈ 30");
    }

    // Counts how many times we can divide n by 2 until we get 0 (or 1)
    public static int countHalvingSteps(long n) {
        if (n <= 0) return -1; // invalid input
        int steps = 0;
        while (n > 1) {
            n /= 2;
            steps++;
        }
        return steps;
    }
}