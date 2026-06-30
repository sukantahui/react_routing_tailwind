/**
 * Binary Recursion: Tree Traversal
 * Recurrence: T(n) = 2T(n/2) + O(1), T(1) = O(1)
 * Time Complexity: O(n) — linear (non-overlapping subproblems)
 * Space Complexity: O(log n) — recursion stack depth = height of tree
 * 
 * This is binary recursion without overlapping subproblems.
 * Each node is visited exactly once.
 */
public class TreeTraversalBinary {
    static class Node {
        int data;
        Node left, right;
        Node(int data) {
            this.data = data;
            left = right = null;
        }
    }

    private static int callCount = 0;
    private static int maxDepth = 0;
    private static int visitCount = 0;

    public static void main(String[] args) {
        Node root = buildTree();

        callCount = 0;
        maxDepth = 0;
        visitCount = 0;
        inorder(root);

        System.out.println("Binary Recursion: Tree Traversal");
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Number of nodes visited: " + visitCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(log n) (balanced tree)");

        // Show for a larger tree
        System.out.println("\nFor a balanced tree with n nodes:");
        int n = 15;
        Node bigTree = buildBalancedTree(1, n);
        callCount = 0;
        maxDepth = 0;
        visitCount = 0;
        inorder(bigTree);
        System.out.println("n=" + n + " → " + visitCount + " visits, depth=" + maxDepth);
        System.out.println("Expected depth: log₂(" + n + ") ≈ " + (int)(Math.log(n)/Math.log(2)));
        System.out.println("Time is O(n) because each node is visited once.");
        System.out.println("Unlike Fibonacci, there are no overlapping subproblems.");
    }

    public static Node buildTree() {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
        return root;
    }

    public static Node buildBalancedTree(int start, int end) {
        if (start > end) return null;
        int mid = start + (end - start) / 2;
        Node node = new Node(mid);
        node.left = buildBalancedTree(start, mid - 1);
        node.right = buildBalancedTree(mid + 1, end);
        return node;
    }

    public static void inorder(Node node) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (node == null) {
            depth--;
            return;
        }

        // Binary recursion: two calls
        inorder(node.left);
        visitCount++;
        inorder(node.right);
        depth--;
    }
}