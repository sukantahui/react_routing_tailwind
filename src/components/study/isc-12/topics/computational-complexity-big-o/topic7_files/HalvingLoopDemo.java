/**
 * Compares O(log n) halving loop with O(n) linear loop.
 * Shows the dramatic difference in iteration counts.
 */
public class HalvingLoopDemo {
    public static void main(String[] args) {
        int n = 1_000_000;

        // O(n) loop
        System.out.println("O(n) loop: iterates " + n + " times.");
        // (We don't actually run the loop for 1e6 to keep output concise)

        // O(log n) halving loop
        int count = 0;
        int temp = n;
        while (temp > 0) {
            count++;
            temp /= 2;
        }
        System.out.println("O(log n) halving loop: iterates " + count + " times.");

        // Doubling loop (another O(log n) pattern)
        count = 0;
        temp = 1;
        while (temp < n) {
            count++;
            temp *= 2;
        }
        System.out.println("O(log n) doubling loop: iterates " + count + " times.");

        System.out.println("\nThe halving loop is about " + (n / count) + "x fewer iterations.");
    }
}