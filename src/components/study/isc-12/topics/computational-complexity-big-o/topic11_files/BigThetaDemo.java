/**
 * Demonstrates algorithms with Big-Θ complexity (tight bounds).
 */
public class BigThetaDemo {
    public static void main(String[] args) {
        int n = 1000;

        // Θ(n): Sum of array
        System.out.println("Sum of array (must visit every element): Θ(n)");
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = i;
        long sum = 0;
        for (int i = 0; i < n; i++) sum += arr[i];
        System.out.println("Sum = " + sum);

        // Θ(n²): Nested loops (always run n² times)
        System.out.println("\nNested loop: Θ(n²) — always n² iterations");
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        System.out.println("Count = " + count + " (n² = " + n*n + ")");

        // Θ(log n): Halving loop
        System.out.println("\nHalving loop: Θ(log n) — always log₂(n) steps");
        int steps = 0;
        int temp = n;
        while (temp > 1) {
            temp /= 2;
            steps++;
        }
        System.out.println("Steps = " + steps + " (log₂(n) ≈ " + (int)(Math.log(n)/Math.log(2)) + ")");
    }
}