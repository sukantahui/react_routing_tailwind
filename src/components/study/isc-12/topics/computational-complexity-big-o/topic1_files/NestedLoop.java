/**
 * Demonstrates O(n²) time complexity.
 * The inner loop runs 'n' times for each iteration of the outer loop.
 * Total iterations: n * n = n².
 */
public class NestedLoop {
    public static void main(String[] args) {
        int n = 10;
        int count = 0;
        
        // Time Complexity: O(n²) - Quadratic
        // The number of operations grows quadratically with the input size.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count++;
            }
        }
        
        System.out.println("Total iterations (n=" + n + "): " + count);
        System.out.println("Expected n²: " + (n * n));
    }
}