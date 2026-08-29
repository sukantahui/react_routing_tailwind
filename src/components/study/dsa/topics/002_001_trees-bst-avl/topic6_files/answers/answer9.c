#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

bool is_identical(TNode *t1, TNode *t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return (t1->data == t2->data) && is_identical(t1->left, t2->left) && is_identical(t1->right, t2->right);
}

int main() {
    TNode *r1 = (TNode*)malloc(sizeof(TNode)); r1->data = 1; r1->left = NULL; r1->right = NULL;
    TNode *r2 = (TNode*)malloc(sizeof(TNode)); r2->data = 1; r2->left = NULL; r2->right = NULL;

    printf("--- Structural Tree Identity Check ---\n");
    if (is_identical(r1, r2)) printf("Trees are Structurally Identical!\n");
    else printf("Trees are NOT Identical.\n");
    return 0;
}
