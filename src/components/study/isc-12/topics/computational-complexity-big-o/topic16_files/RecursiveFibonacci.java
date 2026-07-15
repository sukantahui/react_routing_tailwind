/**
 * Naive recursive Fibonacci.
 * Recurrence: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)
 * Time: O(2ⁿ), Space: O(n) (recursion stack depth = n)
 */
public class RecursiveFibonacci {
    private static int callCount = 0;

    public static void main(String[] args) {
        int n = 10;
        callCount = 0;
        long result = fib(n);
        System.out.println("fib(" + n + ") = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("For n=10, 2^10 = 1024, calls = " + callCount);

        System.out.println("\nTime: O(2ⁿ), Space: O(n)");

        // Show growth
        System.out.println("\nFibonacci call counts:");
        for (int i = 1; i <= 10; i++) {
            callCount = 0;
            fib(i);
            System.out.println("fib(" + i + ") calls: " + callCount);
        }
    }

    public static long fib(int n) {
        callCount++;

        // Base cases
        if (n <= 1) return n;

        // Recursive cases: T(n) = T(n-1) + T(n-2) + O(1)
        return fib(n - 1) + fib(n - 2);
    }
}