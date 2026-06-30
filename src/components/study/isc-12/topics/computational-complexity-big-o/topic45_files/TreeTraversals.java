/**
 * Recursive Tree Traversals: Inorder, Preorder, Postorder
 * Time Complexity: O(n) — each node visited once
 * Space Complexity: O(h) — recursion stack depth = height of tree
 * 
 * For a balanced tree: O(log n) space
 * For a skewed tree: O(n) space
 */
public class TreeTraversals {
    // Simple binary tree node
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

    public static void main(String[] args) {
        // Build a sample tree
        Node root = buildTree();

        System.out.println("=== Tree Traversals ===");
        System.out.println("Tree structure: 1 → 2, 3; 2 → 4, 5; 3 → 6, 7");

        // Inorder
        System.out.println("\n1. Inorder (Left, Root, Right):");
        callCount = 0;
        maxDepth = 0;
        inorder(root);
        System.out.println("\n   Calls: " + callCount + ", Depth: " + maxDepth);

        // Preorder
        System.out.println("\n2. Preorder (Root, Left, Right):");
        callCount = 0;
        maxDepth = 0;
        preorder(root);
        System.out.println("\n   Calls: " + callCount + ", Depth: " + maxDepth);

        // Postorder
        System.out.println("\n3. Postorder (Left, Right, Root):");
        callCount = 0;
        maxDepth = 0;
        postorder(root);
        System.out.println("\n   Calls: " + callCount + ", Depth: " + maxDepth);

        System.out.println("\nAll traversals visit each node once → O(n) time");
        System.out.println("Depth = height of tree → O(h) space");
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

    // Inorder: Left, Root, Right
    public static void inorder(Node node) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (node == null) {
            depth--;
            return;
        }
        String indent = "  ".repeat(depth - 1);
        System.out.print(indent + "visiting " + node.data + "\n");
        inorder(node.left);
        inorder(node.right);
        depth--;
    }

    // Preorder: Root, Left, Right
    public static void preorder(Node node) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (node == null) {
            depth--;
            return;
        }
        String indent = "  ".repeat(depth - 1);
        System.out.print(indent + "visiting " + node.data + "\n");
        preorder(node.left);
        preorder(node.right);
        depth--;
    }

    // Postorder: Left, Right, Root
    public static void postorder(Node node) {
        callCount++;
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        if (node == null) {
            depth--;
            return;
        }
        String indent = "  ".repeat(depth - 1);
        postorder(node.left);
        postorder(node.right);
        System.out.print(indent + "visiting " + node.data + "\n");
        depth--;
    }

    private static int depth = 0;
}