/**
 * Analyzes the Tower of Hanoi recursion.
 * Shows moves, call count, depth, and growth.
 */
public class TowerOfHanoiAnalysis {
    private static int moveCount = 0;
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        System.out.println("=== Tower of Hanoi Analysis ===\n");

        int[] testNs = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        System.out.println("n\tMoves (2ⁿ-1)\tCalls\t\tDepth\tTime (est.)");
        System.out.println("----------------------------------------------------");

        for (int n : testNs) {
            moveCount = 0;
            callCount = 0;
            maxDepth = 0;
            // We'll just count, not print moves for n > 3
            if (n <= 3) {
                towerOfHanoi(n, 'A', 'C', 'B');
            } else {
                // For larger n, just count without printing to keep output clean
                countTowerOfHanoi(n);
            }
            long expectedMoves = (1L << n) - 1;
            System.out.printf("%d\t%d\t\t%d\t\t%d\t\t~%.1f seconds\n",
                n, expectedMoves, callCount, maxDepth, expectedMoves / 1e9);
        }

        System.out.println("\nObservations:");
        System.out.println("  - Moves = 2ⁿ - 1");
        System.out.println("  - Calls = 2ⁿ - 1 (same as moves)");
        System.out.println("  - Depth = n (linear)");
        System.out.println("  - Time: O(2ⁿ), Space: O(n)");

        // Show the explosion
        System.out.println("\nFor n=20:");
        long moves20 = (1L << 20) - 1;
        System.out.println("moves = " + moves20 + " ≈ 1,048,575");
        System.out.println("At 1 move per second, it would take ~12 days.");

        System.out.println("\nFor n=30:");
        long moves30 = (1L << 30) - 1;
        System.out.println("moves = " + moves30 + " ≈ 1,073,741,823");
        System.out.println("At 1 move per second, it would take ~34 years.");

        System.out.println("\nFor n=40:");
        long moves40 = (1L << 40) - 1;
        System.out.println("moves = " + moves40 + " ≈ 1,099,511,627,775");
        System.out.println("At 1 move per second, it would take ~34,000 years.");

        System.out.println("\nFor n=64:");
        // 2^64 = 1.8446744e19, subtract 1
        System.out.println("moves = 2^64 - 1 ≈ 1.84 × 10^19");
        System.out.println("At 1 move per second, it would take ~5.8 × 10^11 years.");
        System.out.println("The universe is about 1.38 × 10^10 years old.");
        System.out.println("So it would take about 42 times the age of the universe!");
        System.out.println("This is why Tower of Hanoi is O(2ⁿ) — completely impractical for large n.");
    }

    // Recursive version that counts but doesn't print
    public static void towerOfHanoi(int n, char source, char target, char auxiliary) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (n == 1) {
            moveCount++;
            depth--;
            return;
        }
        towerOfHanoi(n - 1, source, auxiliary, target);
        moveCount++;
        towerOfHanoi(n - 1, auxiliary, target, source);
        depth--;
    }

    // Count-only version for larger n (no printing overhead)
    public static void countTowerOfHanoi(int n) {
        // We'll call the same method; it already counts without printing
        depth = 0; // reset
        towerOfHanoi(n, 'A', 'C', 'B');
    }

    private static int depth = 0;
}