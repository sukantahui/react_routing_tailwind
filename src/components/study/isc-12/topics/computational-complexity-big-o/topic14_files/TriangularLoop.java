/**
 * Demonstrates triangular loops where inner loop depends on outer.
 * Both are O(n²) but with different constants.
 */
public class TriangularLoop {
    public static void main(String[] args) {
        int n = 10;

        // Pattern 1: j from 0 to i (inclusive)
        System.out.println("Triangular loop: j from 0 to i");
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                count++;
            }
        }
        System.out.println("Iterations: " + count + " (expected " + n*(n+1)/2 + ")");

        // Pattern 2: j from i to n
        count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                count++;
            }
        }
        System.out.println("j from i to n: " + count + " (expected " + n*(n+1)/2 + ")");

        // Both simplify to O(n²)
        System.out.println("Both are O(n²) because " + n*(n+1)/2 + " ≈ " + n*n + "/2, which is O(n²)");
    }
}