#include <stdio.h>
#include <stdlib.h>

typedef struct AVLNode {
    int key, height;
    struct AVLNode *left, *right;
} AVLNode;

int height(AVLNode *n) { return n ? n->height : 0; }
int max(int a, int b) { return (a > b) ? a : b; }

AVLNode* create_avl_node(int key) {
    AVLNode *n = (AVLNode*)malloc(sizeof(AVLNode));
    n->key = key; n->height = 1; n->left = NULL; n->right = NULL;
    return n;
}

AVLNode* right_rotate(AVLNode *y) {
    AVLNode *x = y->left;
    AVLNode *T2 = x->right;
    x->right = y; y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}

AVLNode* left_rotate(AVLNode *x) {
    AVLNode *y = x->right;
    AVLNode *T2 = y->left;
    y->left = x; x->right = T2;
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    return y;
}

int get_balance(AVLNode *n) { return n ? height(n->left) - height(n->right) : 0; }

AVLNode* insert_avl(AVLNode *node, int key) {
    if (!node) return create_avl_node(key);
    if (key < node->key) node->left = insert_avl(node->left, key);
    else if (key > node->key) node->right = insert_avl(node->right, key);
    else return node;

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = get_balance(node);

    if (balance > 1 && key < node->left->key) return right_rotate(node); // LL
    if (balance < -1 && key > node->right->key) return left_rotate(node); // RR
    if (balance > 1 && key > node->left->key) { // LR
        node->left = left_rotate(node->left);
        return right_rotate(node);
    }
    if (balance < -1 && key < node->right->key) { // RL
        node->right = right_rotate(node->right);
        return left_rotate(node);
    }
    return node;
}

void pre_order(AVLNode *r) { if (r) { printf("%d ", r->key); pre_order(r->left); pre_order(r->right); } }

int main() {
    AVLNode *root = NULL;
    printf("--- AVL Tree Self-Balancing Engine ---\nInserting 10, 20, 30 (Triggers RR Rotation)...\n");
    root = insert_avl(root, 10); root = insert_avl(root, 20); root = insert_avl(root, 30);
    printf("Preorder Traversal of Balanced AVL Tree: "); pre_order(root); printf("\n");
    return 0;
}
