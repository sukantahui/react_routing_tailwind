#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

int count_total_nodes(TNode *root) {
    if (!root) return 0;
    return 1 + count_total_nodes(root->left) + count_total_nodes(root->right);
}

int count_leaf_nodes(TNode *root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return count_leaf_nodes(root->left) + count_leaf_nodes(root->right);
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 10; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 5; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 15; root->right->left = NULL; root->right->right = NULL;

    printf("--- Tree Node Classification Count ---\n");
    printf("Total Nodes = %d\nLeaf Nodes  = %d\n", count_total_nodes(root), count_leaf_nodes(root));
    return 0;
}
