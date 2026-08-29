#include <stdio.h>
#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left;
    struct AVLNode *right;
    int height;
} AVLNode;

int height(AVLNode *n) {
    if (n == NULL) return 0;
    return n->height;
}

int max(int a, int b) {
    return (a > b) ? a : b;
}

AVLNode* createAVLNode(int key) {
    AVLNode *node = (AVLNode *)malloc(sizeof(AVLNode));
    node->key = key;
    node->left = NULL;
    node->right = NULL;
    node->height = 1;
    return node;
}

// Right Rotate (LL Rotation)
AVLNode* rightRotate(AVLNode *y) {
    AVLNode *x = y->left;
    AVLNode *T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;

    printf("[AVL ROTATION] Right Rotate (LL) performed on node %d\n", y->key);
    return x;
}

// Left Rotate (RR Rotation)
AVLNode* leftRotate(AVLNode *x) {
    AVLNode *y = x->right;
    AVLNode *T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    printf("[AVL ROTATION] Left Rotate (RR) performed on node %d\n", x->key);
    return y;
}

int getBalance(AVLNode *n) {
    if (n == NULL) return 0;
    return height(n->left) - height(n->right);
}

AVLNode* insertAVL(AVLNode *node, int key) {
    if (node == NULL) return createAVLNode(key);

    if (key < node->key) node->left = insertAVL(node->left, key);
    else if (key > node->key) node->right = insertAVL(node->right, key);
    else return node;

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    // Left Left (LL Case)
    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    // Right Right (RR Case)
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    // Left Right (LR Case)
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    // Right Left (RL Case)
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

void inorder(AVLNode *root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d (Height: %d, Balance: %d) | ", root->key, root->height, getBalance(root));
        inorder(root->right);
    }
}

int main() {
    printf("=== AVL Self-Balancing Binary Search Tree in C ===\n\n");
    AVLNode *root = NULL;

    root = insertAVL(root, 10);
    root = insertAVL(root, 20);
    root = insertAVL(root, 30); // Triggers RR Rotation
    root = insertAVL(root, 40);
    root = insertAVL(root, 50); // Triggers RR Rotation
    root = insertAVL(root, 25); // Triggers RL Rotation

    printf("\nInorder Traversal of Balanced AVL Tree:\n");
    inorder(root);
    printf("\n");

    return 0;
}
