#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

int find_idx(int arr[], int start, int end, int val) {
    for (int i = start; i <= end; i++) if (arr[i] == val) return i;
    return -1;
}

TNode* build_tree(int preorder[], int inorder[], int in_start, int in_end, int *pre_idx) {
    if (in_start > in_end) return NULL;
    int curr_val = preorder[(*pre_idx)++];
    TNode *n = (TNode*)malloc(sizeof(TNode));
    n->data = curr_val; n->left = NULL; n->right = NULL;
    if (in_start == in_end) return n;

    int in_idx = find_idx(inorder, in_start, in_end, curr_val);
    n->left = build_tree(preorder, inorder, in_start, in_idx - 1, pre_idx);
    n->right = build_tree(preorder, inorder, in_idx + 1, in_end, pre_idx);
    return n;
}

void print_inorder(TNode *r) { if (r) { print_inorder(r->left); printf("%d ", r->data); print_inorder(r->right); } }

int main() {
    int preorder[] = {1, 2, 4, 3};
    int inorder[]  = {4, 2, 1, 3};
    int pre_idx = 0;
    printf("--- Construct Tree from Inorder & Preorder ---\n");
    TNode *root = build_tree(preorder, inorder, 0, 3, &pre_idx);
    printf("Reconstructed Inorder: "); print_inorder(root); printf("\n");
    return 0;
}
