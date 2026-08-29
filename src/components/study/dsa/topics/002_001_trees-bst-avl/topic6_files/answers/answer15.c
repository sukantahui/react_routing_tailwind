#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

int abs(int x) { return (x < 0) ? -x : x; }
int max(int a, int b) { return (a > b) ? a : b; }

int check_balance(TNode *root, bool *is_bal) {
    if (!root) return 0;
    int lh = check_balance(root->left, is_bal);
    int rh = check_balance(root->right, is_bal);
    if (abs(lh - rh) > 1) *is_bal = false;
    return 1 + max(lh, rh);
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;

    bool is_bal = true;
    check_balance(root, &is_bal);
    printf("--- Height-Balanced Tree Check ---\nResult: Tree is %s\n", is_bal ? "Balanced" : "Unbalanced");
    return 0;
}
