/**
 * Shows that a balanced binary tree with n nodes has height O(log n).
 * This class computes the maximum height for a given number of nodes
 * and the number of nodes for a given height.
 */
public class TreeHeightDemo {
    public static void main(String[] args) {
        int nodes = 1_000_000;
        // In a perfect binary tree, height h has 2^(h+1) - 1 nodes
        // So height = log2(nodes + 1) - 1
        int height = (int)(Math.log(nodes + 1) / Math.log(2)) - 1;
        System.out.println("For a balanced binary tree with " + nodes + " nodes:");
        System.out.println("Height ≈ " + height + " (or " + (height + 1) + " levels).");

        // Given height, compute max nodes
        int h = 10;
        int maxNodes = (int)(Math.pow(2, h + 1) - 1);
        System.out.println("\nA tree of height " + h + " can hold up to " + maxNodes + " nodes.");
        System.out.println("Search/insert/delete operations take O(log n) = O(" + h + ") time.");
    }
}