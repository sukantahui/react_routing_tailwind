/**
 * Tower of Hanoi — Recursive Solution
 * Recurrence: T(n) = 2T(n-1) + O(1), T(1) = O(1)
 * Time Complexity: O(2ⁿ)
 * Space Complexity: O(n) — recursion stack depth = n
 * 
 * Number of moves = 2ⁿ - 1
 */
public class TowerOfHanoiRecursive {
    private static int moveCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 3;

        moveCount = 0;
        maxDepth = 0;
        System.out.println("Tower of Hanoi with " + n + " disks:");
        towerOfHanoi(n, 'A', 'C', 'B');

        System.out.println("Total moves: " + moveCount);
        System.out.println("Expected moves: " + ((1 << n) - 1) + " (2^" + n + " - 1)");
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(2ⁿ), Space: O(n)");

        // Show for different n
        System.out.println("\nNumber of moves for different n:");
        for (int i = 1; i <= 10; i++) {
            moveCount = 0;
            towerOfHanoi(i, 'A', 'C', 'B');
            System.out.println("n=" + i + " → " + moveCount + " moves");
        }
        System.out.println("\nFor n=64, moves = 2^64 - 1 ≈ 1.84 × 10^19 moves.");
        System.out.println("Even at 1 billion moves per second, it would take over 580 years!");
        System.out.println("This is why Tower of Hanoi is O(2ⁿ) — exponential time.");
    }

    public static void towerOfHanoi(int n, char source, char target, char auxiliary) {
        // Track depth
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (n == 1) {
            moveCount++;
            String indent = "  ".repeat(depth - 1);
            System.out.println(indent + "Move disk 1 from " + source + " to " + target);
            depth--;
            return;
        }

        // Move n-1 disks from source to auxiliary
        towerOfHanoi(n - 1, source, auxiliary, target);

        // Move the nth disk from source to target
        moveCount++;
        String indent = "  ".repeat(depth - 1);
        System.out.println(indent + "Move disk " + n + " from " + source + " to " + target);

        // Move n-1 disks from auxiliary to target
        towerOfHanoi(n - 1, auxiliary, target, source);

        depth--;
    }

    private static int depth = 0;
}