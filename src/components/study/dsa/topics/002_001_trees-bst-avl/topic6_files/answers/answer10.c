#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

bool is_valid_bst(TNode *root, long min_val, long max_val) {
    if (!root) return true;
    if (root->data <= min_val || root->data >= max_val) return false;
    return is_valid_bst(root->left, min_val, root->data) && is_valid_bst(root->right, root->data, max_val);
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 10; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 5; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 15; root->right->left = NULL; root->right->right = NULL;

    printf("--- Valid BST Validator ---\n");
    if (is_valid_bst(root, LONG_MIN, LONG_MAX)) printf("Binary Tree is a VALID BST!\n");
    else printf("Binary Tree is NOT a valid BST.\n");
    return 0;
}
