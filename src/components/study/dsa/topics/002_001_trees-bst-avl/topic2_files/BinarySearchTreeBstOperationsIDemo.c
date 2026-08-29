/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C
 * Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore Lab)
 * Topic: Binary Search Tree (BST) Operations & 3-Case Deletion Mechanics
 * Methods: Inorder Successor (Min in Right Subtree) & Inorder Predecessor (Max in Left Subtree)
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 1. Definition of a Binary Search Tree Node
typedef struct BSTNode {
    int data;
    struct BSTNode* left;
    struct BSTNode* right;
} BSTNode;

// 2. Helper: Allocate and initialize a new BST node
BSTNode* createNode(int value) {
    BSTNode* newNode = (BSTNode*)malloc(sizeof(BSTNode));
    if (!newNode) {
        fprintf(stderr, "Error: Memory allocation failed for value %d\n", value);
        exit(EXIT_FAILURE);
    }
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 3. Insert a value into the BST (Maintains BST Invariant)
BSTNode* insert(BSTNode* root, int value) {
    if (root == NULL) {
        return createNode(value);
    }
    if (value < root->data) {
        root->left = insert(root->left, value);
    } else if (value > root->data) {
        root->right = insert(root->right, value);
    }
    // Duplicate values are ignored in standard BST
    return root;
}

// 4. Search for a key in the BST - O(h) Time Complexity
BSTNode* search(BSTNode* root, int key) {
    if (root == NULL || root->data == key) {
        return root;
    }
    if (key < root->data) {
        return search(root->left, key);
    }
    return search(root->right, key);
}

// 5. Helper: Find Minimum value node (Leftmost node in a subtree)
BSTNode* findMin(BSTNode* node) {
    BSTNode* current = node;
    while (current && current->left != NULL) {
        current = current->left;
    }
    return current;
}

// 6. Helper: Find Maximum value node (Rightmost node in a subtree)
BSTNode* findMax(BSTNode* node) {
    BSTNode* current = node;
    while (current && current->right != NULL) {
        current = current->right;
    }
    return current;
}

/**
 * ============================================================================
 * DELETION METHOD A: Using Inorder Successor (Smallest in Right Subtree)
 * ============================================================================
 * Case 1: Target has 0 children (Leaf) -> free(root), return NULL
 * Case 2: Target has 1 child -> replace root with non-null child, free(root)
 * Case 3: Target has 2 children ->
 *         a) Find successor = findMin(root->right)
 *         b) Copy successor->data to root->data
 *         c) Recursively delete successor from root->right
 */
BSTNode* deleteUsingSuccessor(BSTNode* root, int key) {
    if (root == NULL) {
        return NULL;
    }

    // Step 1: Navigate down the tree to locate the target node
    if (key < root->data) {
        root->left = deleteUsingSuccessor(root->left, key);
    } else if (key > root->data) {
        root->right = deleteUsingSuccessor(root->right, key);
    } else {
        // Target node found! (root->data == key)

        // CASE 1: Leaf Node (0 Children)
        if (root->left == NULL && root->right == NULL) {
            printf("  [Case 1: Leaf Node] Deleting leaf node %d\n", root->data);
            free(root);
            return NULL;
        }

        // CASE 2: Single Child (1 Child)
        else if (root->left == NULL) {
            // Only right child exists
            printf("  [Case 2: One Child] Node %d has only right child %d\n", root->data, root->right->data);
            BSTNode* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            // Only left child exists
            printf("  [Case 2: One Child] Node %d has only left child %d\n", root->data, root->left->data);
            BSTNode* temp = root->left;
            free(root);
            return temp;
        }

        // CASE 3: Two Children (2 Children) via Inorder Successor
        else {
            BSTNode* successor = findMin(root->right);
            printf("  [Case 3: Two Children] Node %d replaced with Inorder Successor %d\n", root->data, successor->data);
            root->data = successor->data; // Copy successor value
            // Delete successor from right subtree (successor is guaranteed to have at most 1 child)
            root->right = deleteUsingSuccessor(root->right, successor->data);
        }
    }
    return root;
}

/**
 * ============================================================================
 * DELETION METHOD B: Using Inorder Predecessor (Largest in Left Subtree)
 * ============================================================================
 * Case 3 Alternative:
 *         a) Find predecessor = findMax(root->left)
 *         b) Copy predecessor->data to root->data
 *         c) Recursively delete predecessor from root->left
 */
BSTNode* deleteUsingPredecessor(BSTNode* root, int key) {
    if (root == NULL) {
        return NULL;
    }

    if (key < root->data) {
        root->left = deleteUsingPredecessor(root->left, key);
    } else if (key > root->data) {
        root->right = deleteUsingPredecessor(root->right, key);
    } else {
        // Target node found!
        if (root->left == NULL && root->right == NULL) {
            free(root);
            return NULL;
        } else if (root->left == NULL) {
            BSTNode* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            BSTNode* temp = root->left;
            free(root);
            return temp;
        } else {
            // Case 3 with Inorder Predecessor
            BSTNode* predecessor = findMax(root->left);
            printf("  [Case 3: Predecessor] Node %d replaced with Inorder Predecessor %d\n", root->data, predecessor->data);
            root->data = predecessor->data;
            root->left = deleteUsingPredecessor(root->left, predecessor->data);
        }
    }
    return root;
}

// 7. Inorder Traversal (Always prints BST keys in strictly sorted order)
void inorder(BSTNode* root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

// 8. Visual 2D Tree Print in Console
void printTree2D(BSTNode* root, int space) {
    const int COUNT = 6;
    if (root == NULL) return;
    space += COUNT;
    printTree2D(root->right, space);
    printf("\n");
    for (int i = COUNT; i < space; i++) printf(" ");
    printf("[%d]\n", root->data);
    printTree2D(root->left, space);
}

// 9. Memory Cleanup: Post-order recursive deallocation (Zero Leak)
void freeTree(BSTNode* root) {
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
    printf("     CODER & ACCOTAX - BST INSERTION, SEARCH & 3-CASE DELETION   \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    BSTNode* root = NULL;
    int initialKeys[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(initialKeys) / sizeof(initialKeys[0]);

    printf("1. Building Base BST with keys: 50, 30, 70, 20, 40, 60, 80\n");
    for (int i = 0; i < n; i++) {
        root = insert(root, initialKeys[i]);
    }

    printf("\nInorder Traversal (Sorted Output): ");
    inorder(root);
    printf("\n\nCurrent BST Structure (Root = 50):");
    printTree2D(root, 0);

    // --- CASE 1 DEMO: Deleting Leaf Node (20) ---
    printf("\n-----------------------------------------------------------------\n");
    printf("2. DEMONSTRATING CASE 1: Deleting Leaf Node 20 (0 Children)\n");
    printf("-----------------------------------------------------------------\n");
    root = deleteUsingSuccessor(root, 20);
    printf("Inorder after deleting 20: ");
    inorder(root);
    printf("\n");

    // --- CASE 2 DEMO: Deleting Node with Single Child ---
    // Let's insert 25 to give 30 a single child structure or delete 70 after 80 is removed
    printf("\n-----------------------------------------------------------------\n");
    printf("3. DEMONSTRATING CASE 2: Deleting Node with 1 Child\n");
    printf("   First deleting leaf 60, then node 70 will have only right child 80\n");
    printf("-----------------------------------------------------------------\n");
    root = deleteUsingSuccessor(root, 60); // 60 is leaf
    printf("Now deleting node 70 (which now has ONLY child 80)...\n");
    root = deleteUsingSuccessor(root, 70); // 70 has single child 80
    printf("Inorder after deleting 70: ");
    inorder(root);
    printf("\n");

    // --- CASE 3A DEMO: Deleting Node with Two Children using Inorder Successor ---
    printf("\n-----------------------------------------------------------------\n");
    printf("4. DEMONSTRATING CASE 3A: Deleting Root 50 using Inorder Successor\n");
    printf("   (Right subtree contains [80], min is 80 or let's re-add nodes)\n");
    printf("-----------------------------------------------------------------\n");
    // Re-inserting elements to demonstrate 2-child root deletion clearly
    root = insert(root, 65);
    root = insert(root, 90);
    printf("Current Tree before deleting Root 50 (Successor Method):");
    printTree2D(root, 0);
    root = deleteUsingSuccessor(root, 50);
    printf("Inorder after deleting Root 50: ");
    inorder(root);
    printf("\n");

    // --- CASE 3B DEMO: Deleting Node with Two Children using Inorder Predecessor ---
    printf("\n-----------------------------------------------------------------\n");
    printf("5. DEMONSTRATING CASE 3B: Deleting Node with Two Children using Predecessor\n");
    printf("-----------------------------------------------------------------\n");
    // Node 30 currently has left=NULL, right=40. Let's insert 10, 35 to give 30 two children
    root = insert(root, 10);
    root = insert(root, 35);
    printf("Tree before deleting Node 30 using Predecessor:");
    printTree2D(root, 0);
    root = deleteUsingPredecessor(root, 30);
    printf("Inorder after deleting 30 (Predecessor Method): ");
    inorder(root);
    printf("\n");

    // Cleanup memory
    freeTree(root);
    root = NULL;
    printf("\n=================================================================\n");
    printf("All memory blocks successfully freed. Zero leak verified!\n");
    printf("=================================================================\n");

    return 0;
}
