#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* find_min(BSTNode *root) {
    while (root && root->left) root = root->left;
    return root;
}

BSTNode* delete_bst(BSTNode *root, int key) {
    if (!root) return NULL;
    if (key < root->key) root->left = delete_bst(root->left, key);
    else if (key > root->key) root->right = delete_bst(root->right, key);
    else {
        if (!root->left) { BSTNode *temp = root->right; free(root); return temp; }
        else if (!root->right) { BSTNode *temp = root->left; free(root); return temp; }
        BSTNode *temp = find_min(root->right);
        root->key = temp->key;
        root->right = delete_bst(root->right, temp->key);
    }
    return root;
}

void inorder(BSTNode *r) { if (r) { inorder(r->left); printf("%d ", r->key); inorder(r->right); } }

int main() {
    BSTNode *root = (BSTNode*)malloc(sizeof(BSTNode)); root->key = 50; root->left = NULL; root->right = NULL;
    root->left = (BSTNode*)malloc(sizeof(BSTNode)); root->left->key = 30; root->left->left = NULL; root->left->right = NULL;
    root->right = (BSTNode*)malloc(sizeof(BSTNode)); root->right->key = 70; root->right->left = NULL; root->right->right = NULL;

    printf("--- Delete Node from BST ---\nBefore: "); inorder(root); printf("\n");
    root = delete_bst(root, 30);
    printf("After deleting 30: "); inorder(root); printf("\n");
    return 0;
}
