/**
 * Simulates a balanced binary search tree (BST) operations.
 * In a balanced BST, search/insert/delete are O(log n) because height = O(log n).
 */
public class TreeOperations {
    // Simple Node class
    static class Node {
        int key;
        Node left, right;
        Node(int key) { this.key = key; }
    }

    private Node root;

    public static void main(String[] args) {
        TreeOperations tree = new TreeOperations();

        // Insert nodes to form a balanced tree
        int[] keys = {50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85};
        for (int key : keys) {
            tree.insert(key);
        }

        System.out.println("Balanced BST with " + keys.length + " nodes.");
        System.out.println("Height of the tree (levels): " + tree.height(tree.root));
        System.out.println("log₂(n) ≈ " + (int)(Math.log(keys.length) / Math.log(2)));

        // Search for a key
        int target = 60;
        long start = System.nanoTime();
        boolean found = tree.search(target);
        long end = System.nanoTime();
        System.out.println("Search for " + target + ": " + (found ? "found" : "not found") +
                           " in " + (end - start) + " ns");

        // Search time is O(log n) because we traverse the height of the tree.
        System.out.println("Search time is O(log n) because the tree is balanced.");
    }

    public void insert(int key) {
        root = insertRec(root, key);
    }

    private Node insertRec(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key) root.left = insertRec(root.left, key);
        else if (key > root.key) root.right = insertRec(root.right, key);
        return root;
    }

    public boolean search(int key) {
        return searchRec(root, key);
    }

    private boolean searchRec(Node root, int key) {
        if (root == null) return false;
        if (root.key == key) return true;
        if (key < root.key) return searchRec(root.left, key);
        return searchRec(root.right, key);
    }

    public int height(Node node) {
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }
}