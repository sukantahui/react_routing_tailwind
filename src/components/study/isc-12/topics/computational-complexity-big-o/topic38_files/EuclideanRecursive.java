/**
 * Recursive Euclidean Algorithm for GCD
 * Recurrence: T(a,b) = T(b, a % b) + O(1), T(a, 0) = O(1)
 * Time Complexity: O(log min(a,b))
 * Space Complexity: O(log min(a,b)) — recursion stack depth
 */
public class EuclideanRecursive {
    private static int stepCount = 0;

    public static void main(String[] args) {
        int a = 1071;
        int b = 462;

        stepCount = 0;
        int gcd = gcd(a, b);

        System.out.println("Recursive Euclidean Algorithm");
        System.out.println("gcd(" + a + ", " + b + ") = " + gcd);
        System.out.println("Number of steps: " + stepCount);
        System.out.println("Time: O(log min(a,b)), Space: O(log min(a,b))");

        // Test with Fibonacci numbers (worst case)
        System.out.println("\nWorst-case: Fibonacci numbers");
        int fib1 = 13, fib2 = 21;
        stepCount = 0;
        int gcdFib = gcd(fib1, fib2);
        System.out.println("gcd(" + fib1 + ", " + fib2 + ") = " + gcdFib);
        System.out.println("Steps: " + stepCount + " (expected " + fib1 + " steps? Actually ~log_phi(n))");
        System.out.println("For consecutive Fibonacci numbers, steps = index of the smaller Fibonacci number.");

        // Show steps for various inputs
        System.out.println("\nStep counts for different pairs:");
        int[][] pairs = {{100, 50}, {100, 99}, {1000, 999}, {100000, 99999}, {1000000, 999999}};
        for (int[] pair : pairs) {
            stepCount = 0;
            gcd(pair[0], pair[1]);
            System.out.println("gcd(" + pair[0] + ", " + pair[1] + ") → " + stepCount + " steps");
        }
    }

    public static int gcd(int a, int b) {
        stepCount++;

        // Base case: gcd(a, 0) = a
        if (b == 0) {
            return a;
        }

        // Recursive case: gcd(a, b) = gcd(b, a % b)
        return gcd(b, a % b);
    }
}