#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

TNode* create_node(int val) {
    TNode *n = (TNode*)malloc(sizeof(TNode));
    n->data = val; n->left = NULL; n->right = NULL;
    return n;
}

void inorder(TNode *root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

int main() {
    TNode *root = create_node(1);
    root->left = create_node(2);
    root->right = create_node(3);
    root->left->left = create_node(4);

    printf("--- Binary Tree Inorder Traversal ---\nInorder Sequence: ");
    inorder(root);
    printf("\n");
    return 0;
}
