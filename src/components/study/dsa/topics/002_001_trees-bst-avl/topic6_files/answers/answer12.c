#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* lca_bst(BSTNode *root, int p, int q) {
    if (!root) return NULL;
    if (p < root->key && q < root->key) return lca_bst(root->left, p, q);
    if (p > root->key && q > root->key) return lca_bst(root->right, p, q);
    return root;
}

int main() {
    BSTNode *root = (BSTNode*)malloc(sizeof(BSTNode)); root->key = 20; root->left = NULL; root->right = NULL;
    root->left = (BSTNode*)malloc(sizeof(BSTNode)); root->left->key = 8; root->left->left = NULL; root->left->right = NULL;
    root->right = (BSTNode*)malloc(sizeof(BSTNode)); root->right->key = 22; root->right->left = NULL; root->right->right = NULL;

    printf("--- Lowest Common Ancestor in BST ---\n");
    BSTNode *lca = lca_bst(root, 8, 22);
    if (lca) printf("LCA of 8 and 22 is %d\n", lca->key);
    return 0;
}
