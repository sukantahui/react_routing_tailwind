#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

TNode* lca_binary_tree(TNode *root, int p, int q) {
    if (!root || root->data == p || root->data == q) return root;
    TNode *l = lca_binary_tree(root->left, p, q);
    TNode *r = lca_binary_tree(root->right, p, q);
    if (l && r) return root;
    return l ? l : r;
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 3; root->right->left = NULL; root->right->right = NULL;

    printf("--- Lowest Common Ancestor in Binary Tree ---\n");
    TNode *lca = lca_binary_tree(root, 2, 3);
    if (lca) printf("LCA of 2 and 3 is %d\n", lca->data);
    return 0;
}
