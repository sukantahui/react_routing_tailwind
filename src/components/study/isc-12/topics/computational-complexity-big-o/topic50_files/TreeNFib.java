/**
 * Multiple Recursion: Linear (a=3, reduction by 3)
 * Recurrence: T(n) = 3T(n/3) + O(1), T(1) = O(1)
 * Time Complexity: O(n) — linear
 * Space Complexity: O(log n) — recursion stack depth = log₃(n)
 * 
 * This demonstrates multiple recursion where subproblems are independent
 * and reduced by the branching factor.
 */
public class TreeNFib {
    static class Node {
        int data;
        Node[] children;
        Node(int data, int numChildren) {
            this.data = data;
            children = new Node[numChildren];
        }
    }

    private static int callCount = 0;
    private static int maxDepth = 0;
    private static int visitCount = 0;

    public static void main(String[] args) {
        // Build a 3-ary tree
        int depth = 3;
        Node root = buildTree(depth);

        callCount = 0;
        maxDepth = 0;
        visitCount = 0;
        traverse(root);

        System.out.println("Multiple Recursion (a=3, reduction by 3)");
        System.out.println("Tree depth: " + depth);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Number of nodes visited: " + visitCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Expected nodes: (3^(" + depth + "+1) - 1) / 2 = " + ((int)Math.pow(3, depth+1) - 1) / 2);
        System.out.println("Time: O(n), Space: O(log n)");

        // Show growth
        System.out.println("\nNodes for different tree depths:");
        for (int d = 1; d <= 5; d++) {
            Node tree = buildTree(d);
            callCount = 0;
            maxDepth = 0;
            visitCount = 0;
            traverse(tree);
            System.out.println("Depth " + d + " → " + visitCount + " nodes (3^" + (d+1) + " ≈ " + (int)Math.pow(3, d+1) + ")");
        }
        System.out.println("This is O(n) because each node is visited once.");
        System.out.println("Unlike exponential multiple recursion, this is linear.");
    }

    public static Node buildTree(int depth) {
        if (depth == 0) return null;
        Node root = new Node(1, 3);
        for (int i = 0; i < 3; i++) {
            root.children[i] = buildTree(depth - 1);
        }
        return root;
    }

    public static void traverse(Node node) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (node == null) {
            depth--;
            return;
        }
        visitCount++;

        // 3 recursive calls
        for (Node child : node.children) {
            traverse(child);
        }
        depth--;
    }

    private static int depth = 0;
}