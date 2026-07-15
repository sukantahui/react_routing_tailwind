/**
 * Binary Recursion: Tower of Hanoi
 * Recurrence: T(n) = 2T(n-1) + O(1), T(1) = O(1)
 * Time Complexity: O(2ⁿ) — exponential
 * Space Complexity: O(n) — recursion stack depth = n
 * 
 * This is binary recursion where each call makes two calls on n-1.
 * The number of moves is exactly 2ⁿ - 1.
 */
public class HanoiBinary {
    private static int moveCount = 0;
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 4;

        System.out.println("Binary Recursion: Tower of Hanoi");
        System.out.println("Number of disks: " + n);
        System.out.println("Solving Tower of Hanoi...\n");

        moveCount = 0;
        callCount = 0;
        maxDepth = 0;
        hanoi(n, 'A', 'C', 'B');

        System.out.println("\nTotal moves: " + moveCount);
        System.out.println("Expected moves: " + ((1 << n) - 1) + " (2^" + n + " - 1)");
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(2ⁿ), Space: O(n)");

        // Show growth
        System.out.println("\nMoves for different n:");
        for (int i = 1; i <= 10; i++) {
            moveCount = 0;
            hanoi(i, 'A', 'C', 'B');
            System.out.println("n=" + i + " → " + moveCount + " moves");
        }
        System.out.println("\nFor n=64, moves = 2^64 - 1 ≈ 1.84×10^19 moves.");
        System.out.println("Even at 1 billion moves/second, it would take over 580 years!");
        System.out.println("This is why Tower of Hanoi is O(2ⁿ) — exponential time.");
    }

    public static void hanoi(int n, char source, char target, char auxiliary) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        // Base case: one disk
        if (n == 1) {
            moveCount++;
            // Uncomment to see moves:
            // System.out.println("  Move disk 1 from " + source + " to " + target);
            depth--;
            return;
        }

        // Binary recursion: two calls
        hanoi(n - 1, source, auxiliary, target);
        moveCount++;
        // System.out.println("  Move disk " + n + " from " + source + " to " + target);
        hanoi(n - 1, auxiliary, target, source);
        depth--;
    }

    private static int depth = 0;
}