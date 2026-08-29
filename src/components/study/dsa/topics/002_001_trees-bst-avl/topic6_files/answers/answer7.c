#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* inorder_successor(BSTNode *root, int target) {
    BSTNode *succ = NULL;
    BSTNode *curr = root;
    while (curr) {
        if (target < curr->key) {
            succ = curr;
            curr = curr->left;
        } else {
            curr = curr->right;
        }
    }
    return succ;
}

int main() {
    BSTNode *root = (BSTNode*)malloc(sizeof(BSTNode)); root->key = 20; root->left = NULL; root->right = NULL;
    root->left = (BSTNode*)malloc(sizeof(BSTNode)); root->left->key = 8; root->left->left = NULL; root->left->right = NULL;
    root->right = (BSTNode*)malloc(sizeof(BSTNode)); root->right->key = 22; root->right->left = NULL; root->right->right = NULL;

    printf("--- Inorder Successor in BST ---\n");
    BSTNode *succ = inorder_successor(root, 8);
    if (succ) printf("Inorder Successor of 8 is %d\n", succ->key);
    return 0;
}
