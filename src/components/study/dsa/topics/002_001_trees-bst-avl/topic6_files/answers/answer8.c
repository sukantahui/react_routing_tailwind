#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

TNode* mirror_tree(TNode *root) {
    if (!root) return NULL;
    TNode *temp = root->left;
    root->left = mirror_tree(root->right);
    root->right = mirror_tree(temp);
    return root;
}

void inorder(TNode *r) { if (r) { inorder(r->left); printf("%d ", r->data); inorder(r->right); } }

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 3; root->right->left = NULL; root->right->right = NULL;

    printf("--- Invert / Mirror Binary Tree ---\nBefore: "); inorder(root); printf("\n");
    root = mirror_tree(root);
    printf("After : "); inorder(root); printf("\n");
    return 0;
}
