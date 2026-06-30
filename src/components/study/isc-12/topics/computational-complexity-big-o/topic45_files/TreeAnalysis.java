/**
 * Analyzes tree traversal recursion depth for different tree shapes.
 * Compares balanced trees vs skewed trees.
 */
public class TreeAnalysis {
    static class Node {
        int data;
        Node left, right;
        Node(int data) { this.data = data; }
    }

    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 10;

        System.out.println("=== Tree Analysis: Balanced vs Skewed ===");
        System.out.println("Number of nodes: " + n);
        System.out.println();

        // Balanced tree
        Node balancedRoot = buildBalancedTree(1, n);
        maxDepth = 0;
        inorder(balancedRoot);
        System.out.println("Balanced tree height: " + maxDepth);
        System.out.println("Balanced tree: O(log n) space ~ " + (int)(Math.log(n)/Math.log(2)));

        // Skewed tree
        Node skewedRoot = buildSkewedTree(n);
        maxDepth = 0;
        inorder(skewedRoot);
        System.out.println("Skewed tree height: " + maxDepth);
        System.out.println("Skewed tree: O(n) space ~ " + n);

        System.out.println("\nTime is O(n) for both — only space differs.");
        System.out.println("Balanced trees are more memory-efficient for recursion.");
    }

    // Build a balanced BST from 1 to n
    public static Node buildBalancedTree(int start, int end) {
        if (start > end) return null;
        int mid = start + (end - start) / 2;
        Node node = new Node(mid);
        node.left = buildBalancedTree(start, mid - 1);
        node.right = buildBalancedTree(mid + 1, end);
        return node;
    }

    // Build a skewed tree (right-skewed, like a linked list)
    public static Node buildSkewedTree(int n) {
        Node root = new Node(1);
        Node current = root;
        for (int i = 2; i <= n; i++) {
            current.right = new Node(i);
            current = current.right;
        }
        return root;
    }

    // Inorder traversal to measure depth
    public static void inorder(Node node) {
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (node == null) {
            depth--;
            return;
        }
        inorder(node.left);
        inorder(node.right);
        depth--;
    }

    private static int depth = 0;
}