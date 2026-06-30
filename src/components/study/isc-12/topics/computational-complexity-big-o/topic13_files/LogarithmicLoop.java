/**
 * Demonstrates logarithmic loops: O(log n)
 * The loop variable doubles or halves each iteration.
 */
public class LogarithmicLoop {
    public static void main(String[] args) {
        int n = 1000000;

        // O(log n) — doubling
        System.out.println("Doubling loop: O(log n)");
        int steps = 0;
        for (int i = 1; i < n; i *= 2) {
            steps++;
        }
        System.out.println("Iterations: " + steps + " (log₂(" + n + ") ≈ " + (int)(Math.log(n)/Math.log(2)) + ")");

        // O(log n) — halving
        System.out.println("\nHalving loop: O(log n)");
        steps = 0;
        for (int i = n; i > 0; i /= 2) {
            steps++;
        }
        System.out.println("Iterations: " + steps + " (log₂(" + n + ") ≈ " + (int)(Math.log(n)/Math.log(2)) + ")");

        // Compare with linear loop
        System.out.println("\nLinear loop would take " + n + " iterations.");
        System.out.println("Logarithmic loop is much faster for large n.");
    }
}