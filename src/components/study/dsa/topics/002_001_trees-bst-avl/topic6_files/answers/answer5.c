#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* insert_bst(BSTNode *root, int key) {
    if (!root) {
        BSTNode *n = (BSTNode*)malloc(sizeof(BSTNode));
        n->key = key; n->left = NULL; n->right = NULL;
        return n;
    }
    if (key < root->key) root->left = insert_bst(root->left, key);
    else if (key > root->key) root->right = insert_bst(root->right, key);
    return root;
}

bool search_bst(BSTNode *root, int key) {
    if (!root) return false;
    if (root->key == key) return true;
    if (key < root->key) return search_bst(root->left, key);
    return search_bst(root->right, key);
}

int main() {
    BSTNode *root = NULL;
    printf("--- BST Insertion & Key Search Engine ---\n");
    root = insert_bst(root, 50); root = insert_bst(root, 30); root = insert_bst(root, 70);

    int key = 30;
    if (search_bst(root, key)) printf("Key %d FOUND in BST!\n", key);
    else printf("Key %d NOT found in BST.\n", key);

    return 0;
}
