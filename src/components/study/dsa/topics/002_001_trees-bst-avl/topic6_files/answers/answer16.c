#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

void kth_smallest_util(BSTNode *root, int k, int *count, int *ans) {
    if (!root || *count >= k) return;
    kth_smallest_util(root->left, k, count, ans);
    (*count)++;
    if (*count == k) { *ans = root->key; return; }
    kth_smallest_util(root->right, k, count, ans);
}

int kth_smallest(BSTNode *root, int k) {
    int count = 0, ans = -1;
    kth_smallest_util(root, k, &count, &ans);
    return ans;
}

int main() {
    BSTNode *root = (BSTNode*)malloc(sizeof(BSTNode)); root->key = 50; root->left = NULL; root->right = NULL;
    root->left = (BSTNode*)malloc(sizeof(BSTNode)); root->left->key = 30; root->left->left = NULL; root->left->right = NULL;
    root->right = (BSTNode*)malloc(sizeof(BSTNode)); root->right->key = 70; root->right->left = NULL; root->right->right = NULL;

    printf("--- K-th Smallest Element in BST ---\n");
    int k = 2;
    printf("The %d-nd Smallest Key = %d\n", k, kth_smallest(root, k));
    return 0;
}
