#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

int max(int a, int b) { return (a > b) ? a : b; }

int max_path_sum_util(TNode *root, int *max_sum) {
    if (!root) return 0;
    int left_sum = max(0, max_path_sum_util(root->left, max_sum));
    int right_sum = max(0, max_path_sum_util(root->right, max_sum));
    *max_sum = max(*max_sum, root->data + left_sum + right_sum);
    return root->data + max(left_sum, right_sum);
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 10; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 10; root->right->left = NULL; root->right->right = NULL;

    int max_sum = INT_MIN;
    max_path_sum_util(root, &max_sum);
    printf("--- Maximum Path Sum in Binary Tree ---\nMaximum Path Sum = %d\n", max_sum);
    return 0;
}
