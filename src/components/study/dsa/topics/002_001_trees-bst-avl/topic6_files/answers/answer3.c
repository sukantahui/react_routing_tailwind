#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

int max(int a, int b) { return (a > b) ? a : b; }

int get_height(TNode *root) {
    if (!root) return 0;
    return 1 + max(get_height(root->left), get_height(root->right));
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;
    root->left->left = (TNode*)malloc(sizeof(TNode)); root->left->left->data = 3; root->left->left->left = NULL; root->left->left->right = NULL;

    printf("--- Tree Height & Depth Calculator ---\n");
    printf("Binary Tree Height = %d\n", get_height(root));
    return 0;
}
