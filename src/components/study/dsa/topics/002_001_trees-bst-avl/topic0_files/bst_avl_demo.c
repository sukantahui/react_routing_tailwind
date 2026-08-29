#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// ============================================================================
// Binary Search Tree (BST) Node & AVL Struct Definition
// ============================================================================
typedef struct TreeNode {
    int key;
    int height;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int max(int a, int b) {
    return (a > b) ? a : b;
}

int getHeight(TreeNode *n) {
    if (n == NULL) return 0;
    return n->height;
}

TreeNode* createNode(int key) {
    TreeNode *node = (TreeNode *)malloc(sizeof(TreeNode));
    node->key = key;
    node->height = 1; // New node initially at height 1
    node->left = NULL;
    node->right = NULL;
    return node;
}

// Get Balance Factor of Node
int getBalance(TreeNode *n) {
    if (n == NULL) return 0;
    return getHeight(n->left) - getHeight(n->right);
}

// Right Rotate Subtree rooted with y (LL Fix)
TreeNode* rightRotate(TreeNode *y) {
    TreeNode *x = y->left;
    TreeNode *T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;

    printf("[AVL ROTATE] Right Rotation performed around node %d\n", y->key);
    return x;
}

// Left Rotate Subtree rooted with x (RR Fix)
TreeNode* leftRotate(TreeNode *x) {
    TreeNode *y = x->right;
    TreeNode *T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;

    printf("[AVL ROTATE] Left Rotation performed around node %d\n", x->key);
    return y;
}

// Self-Balancing AVL Insertion
TreeNode* insertAVL(TreeNode *node, int key) {
    if (node == NULL) return createNode(key);

    if (key < node->key)
        node->left = insertAVL(node->left, key);
    else if (key > node->key)
        node->right = insertAVL(node->right, key);
    else
        return node; // Duplicate keys not allowed

    node->height = 1 + max(getHeight(node->left), getHeight(node->right));
    int balance = getBalance(node);

    // Case 1: Left Left (LL)
    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    // Case 2: Right Right (RR)
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    // Case 3: Left Right (LR)
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    // Case 4: Right Left (RL)
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

// Search for key in BST - O(log n) avg
bool search(TreeNode *root, int target) {
    if (root == NULL) return false;
    if (root->key == target) return true;
    if (target < root->key) return search(root->left, target);
    return search(root->right, target);
}

// Inorder Traversal (LVR) -> Produces sorted output
void inorder(TreeNode *root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->key);
        inorder(root->right);
    }
}

// Preorder Traversal (VLR)
void preorder(TreeNode *root) {
    if (root != NULL) {
        printf("%d ", root->key);
        preorder(root->left);
        preorder(root->right);
    }
}

// Free Tree Nodes
void freeTree(TreeNode *root) {
    if (root != NULL) {
        freeTree(root->left);
        freeTree(root->right);
        free(root);
    }
}

int main() {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - AVL TREE & BST MASTER CLASS IN C\n");
    printf("========================================================\n\n");

    TreeNode *root = NULL;

    printf("Inserting keys into AVL Tree: 10, 20, 30, 40, 50, 25...\n\n");
    root = insertAVL(root, 10);
    root = insertAVL(root, 20);
    root = insertAVL(root, 30);
    root = insertAVL(root, 40);
    root = insertAVL(root, 50);
    root = insertAVL(root, 25);

    printf("\nInorder Traversal (Sorted Output): ");
    inorder(root);
    printf("\n");

    printf("Preorder Traversal (Root first): ");
    preorder(root);
    printf("\n");

    printf("Tree Height: %d\n", getHeight(root));

    int target = 25;
    printf("Search %d: %s\n", target, search(root, target) ? "FOUND" : "NOT FOUND");

    freeTree(root);
    return 0;
}
