#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

void serialize(TNode *root, char *str) {
    if (!root) { strcat(str, "# "); return; }
    char buf[16]; sprintf(buf, "%d ", root->data);
    strcat(str, buf);
    serialize(root->left, str);
    serialize(root->right, str);
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;

    char str[100] = "";
    serialize(root, str);
    printf("--- Tree Serialization (Preorder String Format) ---\nSerialized Tree: %s\n", str);
    return 0;
}
