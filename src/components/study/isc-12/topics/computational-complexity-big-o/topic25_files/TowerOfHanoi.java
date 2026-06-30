/**
 * Tower of Hanoi — O(2ⁿ) time.
 * The number of moves required is exactly 2ⁿ - 1.
 * For n disks, the time is exponential.
 */
public class TowerOfHanoi {
    private static int moveCount = 0;

    public static void main(String[] args) {
        int n = 4; // Small n for demonstration

        System.out.println("Tower of Hanoi (O(2ⁿ))");
        System.out.println("Number of disks: " + n);
        System.out.println("Moves required: " + (int)(Math.pow(2, n) - 1));
        System.out.println("\nSolving Tower of Hanoi with " + n + " disks:");

        moveCount = 0;
        towerOfHanoi(n, 'A', 'C', 'B');

        System.out.println("Total moves: " + moveCount);
        System.out.println("Expected moves: " + (int)(Math.pow(2, n) - 1));

        // Show growth
        System.out.println("\nMoves required for different numbers of disks:");
        for (int i = 1; i <= 10; i++) {
            long moves = (1L << i) - 1; // 2^i - 1
            System.out.println("n=" + i + " → " + moves + " moves");
        }
        System.out.println("\nFor n=64, moves = 2^64 - 1 ≈ 1.8 × 10^19 moves.");
        System.out.println("Even at 1 billion moves per second, it would take over 580 years!");
        System.out.println("This is why Tower of Hanoi is O(2ⁿ) — exponential time.");
    }

    public static void towerOfHanoi(int n, char from, char to, char aux) {
        if (n == 1) {
            moveCount++;
            System.out.println("  Move disk 1 from " + from + " to " + to);
            return;
        }
        towerOfHanoi(n - 1, from, aux, to);
        moveCount++;
        System.out.println("  Move disk " + n + " from " + from + " to " + to);
        towerOfHanoi(n - 1, aux, to, from);
    }
}