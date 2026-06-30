import java.util.Stack;

/**
 * Compares recursive and iterative inorder traversal.
 * Both are O(n) time.
 * Recursive: O(h) space (call stack)
 * Iterative: O(h) space (explicit stack)
 * 
 * Iterative avoids stack overflow for very deep trees.
 */
public class IterativeTraversal {
    static class Node {
        int data;
        Node left, right;
        Node(int data) { this.data = data; }
    }

    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        // Build a skewed tree (worst-case for recursion)
        int n = 100;
        Node root = buildSkewedTree(n);

        System.out.println("=== Recursive vs Iterative Traversal ===");
        System.out.println("Skewed tree with " + n + " nodes");
        System.out.println();

        // Recursive inorder (may stack overflow for large n)
        System.out.println("1. Recursive inorder:");
        long start = System.nanoTime();
        callCount = 0;
        maxDepth = 0;
        recursiveInorder(root);
        long end = System.nanoTime();
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Max depth: " + maxDepth);
        System.out.println("   Space: O(n) = " + n + " (call stack)");

        // Iterative inorder (safe for large n)
        System.out.println("\n2. Iterative inorder (explicit stack):");
        start = System.nanoTime();
        int iterDepth = iterativeInorder(root);
        end = System.nanoTime();
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Max stack size: " + iterDepth);
        System.out.println("   Space: O(n) = " + n + " (explicit stack)");

        System.out.println("\nBoth are O(n) time and O(h) space.");
        System.out.println("Iterative avoids recursion stack overflow for deep trees.");
        System.out.println("For a balanced tree, both would use O(log n) space.");
    }

    // Build a right-skewed tree
    public static Node buildSkewedTree(int n) {
        Node root = new Node(1);
        Node current = root;
        for (int i = 2; i <= n; i++) {
            current.right = new Node(i);
            current = current.right;
        }
        return root;
    }

    // Recursive inorder with depth tracking
    public static void recursiveInorder(Node node) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (node == null) {
            depth--;
            return;
        }
        recursiveInorder(node.left);
        // visit node
        recursiveInorder(node.right);
        depth--;
    }

    // Iterative inorder using explicit stack
    public static int iterativeInorder(Node root) {
        Stack<Node> stack = new Stack<>();
        Node current = root;
        int maxStackSize = 0;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                if (stack.size() > maxStackSize) maxStackSize = stack.size();
                current = current.left;
            }
            current = stack.pop();
            // visit current
            current = current.right;
        }
        return maxStackSize;
    }

    private static int depth = 0;
}