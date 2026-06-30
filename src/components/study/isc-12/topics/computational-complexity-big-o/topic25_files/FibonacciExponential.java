/**
 * Naive Fibonacci — O(2ⁿ) time.
 * Each call branches into two calls, leading to exponential growth.
 * For n=40, this takes seconds; for n=50, it takes hours.
 */
public class FibonacciExponential {
    private static long callCount = 0;

    public static void main(String[] args) {
        int n = 10;

        System.out.println("Naive Fibonacci (O(2ⁿ))");
        System.out.println("n = " + n);
        
        long start = System.nanoTime();
        long result = fib(n);
        long end = System.nanoTime();

        System.out.println("fib(" + n + ") = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Time: " + (end - start) + " ns");
        System.out.println("Expected calls: " + (int)(Math.pow(2, n) - 1));

        // Show the explosion
        System.out.println("\nCall counts for different n:");
        for (int i = 0; i <= 15; i++) {
            callCount = 0;
            fib(i);
            System.out.println("fib(" + i + ") calls: " + callCount);
        }

        System.out.println("\nFor n=40, fib(40) would make about " + (long)Math.pow(2, 40) + " calls.");
        System.out.println("This is why naive Fibonacci is O(2ⁿ) and impractical for large n.");
    }

    public static long fib(int n) {
        callCount++;
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}