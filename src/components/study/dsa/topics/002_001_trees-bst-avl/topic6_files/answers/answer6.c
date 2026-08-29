#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* find_min(BSTNode *root) {
    while (root && root->left) root = root->left;
    return root;
}

BSTNode* find_max(BSTNode *root) {
    while (root && root->right) root = root->right;
    return root;
}

int main() {
    BSTNode *root = (BSTNode*)malloc(sizeof(BSTNode)); root->key = 50; root->left = NULL; root->right = NULL;
    root->left = (BSTNode*)malloc(sizeof(BSTNode)); root->left->key = 20; root->left->left = NULL; root->left->right = NULL;
    root->right = (BSTNode*)malloc(sizeof(BSTNode)); root->right->key = 80; root->right->left = NULL; root->right->right = NULL;

    printf("--- BST Minimum & Maximum Key Finder ---\n");
    printf("Minimum Key = %d\nMaximum Key = %d\n", find_min(root)->key, find_max(root)->key);
    return 0;
}
