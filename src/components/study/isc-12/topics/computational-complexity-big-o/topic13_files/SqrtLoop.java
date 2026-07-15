/**
 * Demonstrates a square root loop: O(√n)
 * The loop runs until i*i <= n.
 */
public class SqrtLoop {
    public static void main(String[] args) {
        int n = 10000;

        // O(√n) — square root loop
        System.out.println("Square root loop: O(√n)");
        int count = 0;
        for (int i = 1; i * i <= n; i++) {
            count++;
        }
        System.out.println("Iterations: " + count + " (√" + n + " ≈ " + (int)Math.sqrt(n) + ")");

        // Example: finding divisors up to sqrt(n)
        System.out.println("\nChecking divisors up to √n is common in primality tests.");
        int num = 1000003; // a large prime
        boolean isPrime = true;
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
        }
        System.out.println(num + " is prime? " + isPrime);
        System.out.println("Number of iterations: " + (int)Math.sqrt(num));
    }
}