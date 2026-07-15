/**
 * Demonstrates various Big-O complexities with code snippets.
 */
public class BigODemo {
    public static void main(String[] args) {
        int n = 100;

        // O(1) - Constant
        System.out.println("O(1): Array access");
        int[] arr = new int[n];
        int x = arr[0]; // always 1 operation

        // O(n) - Linear
        System.out.println("O(n): Summing array elements");
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += arr[i];
        }

        // O(log n) - Logarithmic
        System.out.println("O(log n): Halving loop");
        int steps = 0;
        int temp = n;
        while (temp > 1) {
            temp /= 2;
            steps++;
        }
        System.out.println("  Steps: " + steps);

        // O(n²) - Quadratic
        System.out.println("O(n²): Nested loop");
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        System.out.println("  Iterations: " + count);

        // O(n log n) - Linearithmic (example: nested with halving)
        System.out.println("O(n log n): Loop with halving inner");
        count = 0;
        for (int i = 0; i < n; i++) {
            int k = n;
            while (k > 1) {
                k /= 2;
                count++;
            }
        }
        System.out.println("  Iterations: " + count);
    }
}