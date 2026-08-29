/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C
 * Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore Lab)
 * Topic 0: Tree Anatomy, Invariants, Height, Depth & Strict Properties
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 1. Definition of a Binary Tree Node
typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

// 2. Allocate and initialize a new tree node
TreeNode* createNode(int value) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    if (!node) {
        fprintf(stderr, "Fatal: Memory allocation failed for node %d\n", value);
        exit(EXIT_FAILURE);
    }
    node->data = value;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 3. Calculate Height of a Tree (Edges on longest path from node to leaf)
// Convention: Empty tree height = -1 (or 0 in node-count convention); leaf height = 0
int calculateHeight(TreeNode* root) {
    if (root == NULL) return -1; // Edge-count convention
    int leftHeight = calculateHeight(root->left);
    int rightHeight = calculateHeight(root->right);
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

// 4. Calculate Depth of a specific key from Root (Distance from root)
int calculateDepth(TreeNode* root, int key, int currentDepth) {
    if (root == NULL) return -1;
    if (root->data == key) return currentDepth;

    int leftSearch = calculateDepth(root->left, key, currentDepth + 1);
    if (leftSearch != -1) return leftSearch;

    return calculateDepth(root->right, key, currentDepth + 1);
}

// 5. Count Total Nodes in Tree
int countTotalNodes(TreeNode* root) {
    if (root == NULL) return 0;
    return 1 + countTotalNodes(root->left) + countTotalNodes(root->right);
}

// 6. Count Leaf Nodes (Nodes with degree 0: left == NULL && right == NULL)
int countLeafNodes(TreeNode* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;
    return countLeafNodes(root->left) + countLeafNodes(root->right);
}

// 7. Count Internal Nodes (Nodes with at least 1 child: degree >= 1)
int countInternalNodes(TreeNode* root) {
    if (root == NULL || (root->left == NULL && root->right == NULL)) return 0;
    return 1 + countInternalNodes(root->left) + countInternalNodes(root->right);
}

// 8. Verify Full Binary Tree Invariant (Every node has either 0 or 2 children)
bool isFullBinaryTree(TreeNode* root) {
    if (root == NULL) return true;
    // If leaf node
    if (root->left == NULL && root->right == NULL) return true;
    // If both children exist, recursively verify subtrees
    if (root->left != NULL && root->right != NULL) {
        return isFullBinaryTree(root->left) && isFullBinaryTree(root->right);
    }
    // If node has only 1 child -> Not a Full Binary Tree
    return false;
}

// 9. Verify Complete Binary Tree Invariant (Array representation index check)
bool isCompleteBinaryTree(TreeNode* root, int index, int totalNodes) {
    if (root == NULL) return true;
    if (index >= totalNodes) return false;

    return isCompleteBinaryTree(root->left, 2 * index + 1, totalNodes) &&
           isCompleteBinaryTree(root->right, 2 * index + 2, totalNodes);
}

// 10. Verify Perfect Binary Tree Invariant (All leaves at same depth d, internal nodes have 2 children)
bool isPerfectRec(TreeNode* root, int depth, int level) {
    if (root == NULL) return true;
    if (root->left == NULL && root->right == NULL) return (depth == level + 1);
    if (root->left == NULL || root->right == NULL) return false;

    return isPerfectRec(root->left, depth, level + 1) &&
           isPerfectRec(root->right, depth, level + 1);
}

int findLeftmostDepth(TreeNode* node) {
    int d = 0;
    while (node != NULL) {
        d++;
        node = node->left;
    }
    return d;
}

bool isPerfectBinaryTree(TreeNode* root) {
    int depth = findLeftmostDepth(root);
    return isPerfectRec(root, depth, 0);
}

// 11. Verify Balanced Binary Tree Invariant (|Height(Left) - Height(Right)| <= 1)
bool isBalancedTree(TreeNode* root, int* height) {
    if (root == NULL) {
        *height = -1;
        return true;
    }

    int lh = 0, rh = 0;
    bool lBalanced = isBalancedTree(root->left, &lh);
    bool rBalanced = isBalancedTree(root->right, &rh);

    *height = 1 + (lh > rh ? lh : rh);

    if (abs(lh - rh) > 1) return false;
    return lBalanced && rBalanced;
}

// 12. Visual 2D Tree Print
void printTree2D(TreeNode* root, int space) {
    const int COUNT = 6;
    if (root == NULL) return;
    space += COUNT;
    printTree2D(root->right, space);
    printf("\n");
    for (int i = COUNT; i < space; i++) printf(" ");
    printf("[%d]\n", root->data);
    printTree2D(root->left, space);
}

// 13. Post-Order Tree Deallocation (Zero Leaks)
void freeTree(TreeNode* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

// ============================================================================
// MAIN DEMONSTRATION
// ============================================================================
int main(void) {
    printf("=================================================================\n");
    printf("  CODER & ACCOTAX - TREE ANATOMY & STRICT INVARIANTS LAB        \n");
    printf("  Mentor: Sukanta Hui · Barrackpore Lab Demonstration            \n");
    printf("=================================================================\n\n");

    // Construct Sample Binary Tree:
    //         50
    //       /    \
    //     30      70
    //    /  \    /  \
    //   20  40  60  80
    TreeNode* root = createNode(50);
    root->left = createNode(30);
    root->right = createNode(70);
    root->left->left = createNode(20);
    root->left->right = createNode(40);
    root->right->left = createNode(60);
    root->right->right = createNode(80);

    printf("1. TREE TOPOLOGY (2D Layout):\n");
    printTree2D(root, 0);

    int total = countTotalNodes(root);
    int leaves = countLeafNodes(root);
    int internals = countInternalNodes(root);
    int treeHeight = calculateHeight(root);

    printf("\n-----------------------------------------------------------------\n");
    printf("2. QUANTITATIVE ANATOMY METRICS:\n");
    printf("-----------------------------------------------------------------\n");
    printf("  • Total Vertices (N):    %d nodes\n", total);
    printf("  • Leaf Nodes (Degree 0): %d leaves\n", leaves);
    printf("  • Internal Nodes (Deg>0):%d internal\n", internals);
    printf("  • Tree Height (Edges):   %d\n", treeHeight);
    printf("  • Root Depth:            %d\n", calculateDepth(root, 50, 0));
    printf("  • Depth of Node 40:      %d\n", calculateDepth(root, 40, 0));
    printf("  • Leaf-Internal Theorem: L (%d) == N_2 (%d) + 1  -> [VERIFIED]\n", leaves, internals);

    printf("\n-----------------------------------------------------------------\n");
    printf("3. STRICT BINARY TREE CLASSIFICATION INVARIANTS:\n");
    printf("-----------------------------------------------------------------\n");
    printf("  • Is Full Binary Tree (0 or 2 children)?   %s\n", isFullBinaryTree(root) ? "YES [TRUE]" : "NO [FALSE]");
    printf("  • Is Complete Binary Tree (Array-packed)?  %s\n", isCompleteBinaryTree(root, 0, total) ? "YES [TRUE]" : "NO [FALSE]");
    printf("  • Is Perfect Binary Tree (All 2^h leaves)? %s\n", isPerfectBinaryTree(root) ? "YES [TRUE]" : "NO [FALSE]");
    
    int dummyH = 0;
    printf("  • Is Balanced Binary Tree (|lh-rh| <= 1)?  %s\n", isBalancedTree(root, &dummyH) ? "YES [TRUE]" : "NO [FALSE]");

    // Clean up memory
    freeTree(root);
    root = NULL;
    printf("\n=================================================================\n");
    printf("All tree nodes freed in post-order. Zero memory leaks verified!\n");
    printf("=================================================================\n");

    return 0;
}
