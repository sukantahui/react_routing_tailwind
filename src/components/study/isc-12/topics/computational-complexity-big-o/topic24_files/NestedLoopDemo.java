/**
 * Demonstrates different nested loop patterns that result in O(n²).
 * All these patterns have the same asymptotic complexity: O(n²).
 */
public class NestedLoopDemo {
    public static void main(String[] args) {
        int n = 10;

        // Pattern 1: Both loops run n times
        System.out.println("Pattern 1: for (i=0; i<n; i++) for (j=0; j<n; j++)");
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        System.out.println("  Iterations: " + count + " = n² = " + n*n);

        // Pattern 2: Triangular loop (j from i to n)
        System.out.println("\nPattern 2: for (i=0; i<n; i++) for (j=i; j<n; j++)");
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                count++;
            }
        }
        System.out.println("  Iterations: " + count + " = n(n+1)/2 = " + n*(n+1)/2);

        // Pattern 3: Triangular loop (j from 0 to i)
        System.out.println("\nPattern 3: for (i=0; i<n; i++) for (j=0; j<=i; j++)");
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                count++;
            }
        }
        System.out.println("  Iterations: " + count + " = n(n+1)/2 = " + n*(n+1)/2);

        // Pattern 4: Inner loop runs n-i times (decreasing)
        System.out.println("\nPattern 4: for (i=0; i<n; i++) for (j=0; j<n-i; j++)");
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                count++;
            }
        }
        System.out.println("  Iterations: " + count + " = n(n+1)/2 = " + n*(n+1)/2);

        System.out.println("\nAll patterns are O(n²) because the total is proportional to n².");
        System.out.println("The constant factor varies (n² vs n²/2), but Big-O ignores constants.");
    }
}