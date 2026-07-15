/**
 * Iterative Euclidean Algorithm for GCD
 * Time Complexity: O(log min(a,b))
 * Space Complexity: O(1) — constant extra space
 */
public class EuclideanIterative {
    private static int stepCount = 0;

    public static void main(String[] args) {
        int a = 1071;
        int b = 462;

        stepCount = 0;
        int gcd = gcd(a, b);

        System.out.println("Iterative Euclidean Algorithm");
        System.out.println("gcd(" + a + ", " + b + ") = " + gcd);
        System.out.println("Number of steps: " + stepCount);
        System.out.println("Time: O(log min(a,b)), Space: O(1)");

        // Compare with recursive version
        System.out.println("\nComparing recursive vs iterative:");
        long start, end;

        start = System.nanoTime();
        EuclideanRecursive.gcd(a, b);
        end = System.nanoTime();
        System.out.println("Recursive time: " + (end - start) + " ns");

        start = System.nanoTime();
        gcd(a, b);
        end = System.nanoTime();
        System.out.println("Iterative time: " + (end - start) + " ns");

        System.out.println("\nBoth give the same result, but iterative uses O(1) space.");
        System.out.println("Iterative is preferred in practice due to no recursion overhead.");
    }

    public static int gcd(int a, int b) {
        while (b != 0) {
            stepCount++;
            int temp = b;
            b = a % b;
            a = temp;
        }
        stepCount++; // for final check (b == 0)
        return a;
    }
}