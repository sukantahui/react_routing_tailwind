/**
 * Demonstrates a linear loop: O(n)
 * The loop runs exactly n times.
 */
public class LinearLoop {
    public static void main(String[] args) {
        int n = 100;

        // O(n) — linear
        System.out.println("Linear loop: O(n)");
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i;
        }
        System.out.println("Sum = " + sum);

        // Another O(n) loop with constant step
        System.out.println("Linear loop with step 2: still O(n)");
        int count = 0;
        for (int i = 0; i < n; i += 2) {
            count++;
        }
        System.out.println("Number of iterations = " + count + " (about n/2, which is O(n))");
    }
}