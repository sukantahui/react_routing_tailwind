#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* sorted_array_to_bst(int arr[], int start, int end) {
    if (start > end) return NULL;
    int mid = start + (end - start) / 2;
    BSTNode *n = (BSTNode*)malloc(sizeof(BSTNode));
    n->key = arr[mid];
    n->left = sorted_array_to_bst(arr, start, mid - 1);
    n->right = sorted_array_to_bst(arr, mid + 1, end);
    return n;
}

void inorder(BSTNode *r) { if (r) { inorder(r->left); printf("%d ", r->key); inorder(r->right); } }

int main() {
    int arr[] = {10, 20, 30, 40, 50, 60, 70};
    int n = 7;
    printf("--- Sorted Array to Height-Balanced BST ---\n");
    BSTNode *root = sorted_array_to_bst(arr, 0, n - 1);
    printf("Balanced BST Inorder: "); inorder(root); printf("\n");
    return 0;
}
