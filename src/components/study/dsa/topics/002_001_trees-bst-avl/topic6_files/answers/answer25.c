#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

void morris_inorder(TNode *root) {
    TNode *curr = root;
    printf("Morris Inorder Traversal (O(1) Space): ");
    while (curr) {
        if (!curr->left) {
            printf("%d ", curr->data);
            curr = curr->right;
        } else {
            TNode *pred = curr->left;
            while (pred->right && pred->right != curr) pred = pred->right;
            if (!pred->right) {
                pred->right = curr;
                curr = curr->left;
            } else {
                pred->right = NULL;
                printf("%d ", curr->data);
                curr = curr->right;
            }
        }
    }
    printf("\n");
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 3; root->right->left = NULL; root->right->right = NULL;

    morris_inorder(root);
    return 0;
}
