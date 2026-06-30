/**
 * Demonstrates logarithmic loops: O(log n).
 * The loop variable doubles or halves each iteration.
 */
public class LogarithmicLoop {
    public static void main(String[] args) {
        int n = 1_000_000;

        // O(log n) — doubling loop
        System.out.println("Doubling loop: O(log n)");
        int steps = 0;
        for (int i = 1; i < n; i *= 2) {
            steps++;
        }
        System.out.println("Iterations: " + steps + " (log₂(" + n + ") ≈ " + (int)(Math.log(n)/Math.log(2)) + ")");

        // O(log n) — halving loop
        System.out.println("\nHalving loop: O(log n)");
        steps = 0;
        for (int i = n; i > 0; i /= 2) {
            steps++;
        }
        System.out.println("Iterations: " + steps + " (log₂(" + n + ") + 1 ≈ " + ((int)(Math.log(n)/Math.log(2)) + 1) + ")");

        // Compare with linear loop
        System.out.println("\nLinear loop would take " + n + " iterations.");
        System.out.println("Logarithmic loop is much faster for large n.");

        // Show values of n and log₂(n)
        System.out.println("\nExamples:");
        for (int i = 1; i <= 10; i++) {
            int size = (int)Math.pow(2, i);
            System.out.println("n = " + size + " → log₂(n) = " + i);
        }
    }
}