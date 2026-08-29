#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

void print_leaves(TNode *root) {
    if (!root) return;
    print_leaves(root->left);
    if (!root->left && !root->right) printf("%d ", root->data);
    print_leaves(root->right);
}

void print_boundary(TNode *root) {
    if (!root) return;
    printf("Boundary Traversal: %d ", root->data);
    print_leaves(root->left);
    print_leaves(root->right);
    printf("\n");
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 20; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 8; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 22; root->right->left = NULL; root->right->right = NULL;

    printf("--- Binary Tree Boundary Traversal ---\n");
    print_boundary(root);
    return 0;
}
