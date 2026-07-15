/**
 * Demonstrates cases where inner loop is independent of outer variable.
 * Can lead to O(n·m) or O(n) if inner is constant.
 */
public class IndependentInnerLoop {
    public static void main(String[] args) {
        int n = 100;
        int m = 50;

        // O(n·m) — inner loop runs m times independent of i
        System.out.println("O(n·m): inner loop runs m times");
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                count++;
            }
        }
        System.out.println("Iterations: " + count + " (expected " + n*m + ")");

        // O(n) — inner loop runs constant times (e.g., 10)
        System.out.println("O(n): inner loop runs constant 10 times");
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 10; j++) {
                count++;
            }
        }
        System.out.println("Iterations: " + count + " (expected " + n*10 + ")");
        System.out.println("That's O(n) because constant factor 10 is ignored.");
    }
}