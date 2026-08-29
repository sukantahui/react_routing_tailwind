#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

void zigzag_traversal(TNode *root) {
    if (!root) return;
    TNode *s1[50], *s2[50];
    int t1 = -1, t2 = -1;

    s1[++t1] = root;
    printf("Zig-Zag Level-Order Traversal: ");
    while (t1 != -1 || t2 != -1) {
        while (t1 != -1) {
            TNode *n = s1[t1--];
            printf("%d ", n->data);
            if (n->left) s2[++t2] = n->left;
            if (n->right) s2[++t2] = n->right;
        }
        while (t2 != -1) {
            TNode *n = s2[t2--];
            printf("%d ", n->data);
            if (n->right) s1[++t1] = n->right;
            if (n->left) s1[++t1] = n->left;
        }
    }
    printf("\n");
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 3; root->right->left = NULL; root->right->right = NULL;

    printf("--- Zig-Zag Spiral Level-Order Traversal ---\n");
    zigzag_traversal(root);
    return 0;
}
