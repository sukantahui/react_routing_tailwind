#include <stdio.h>
#include <stdlib.h>

typedef struct TSTNode {
    char data;
    unsigned is_end: 1;
    struct TSTNode *left, *eq, *right;
} TSTNode;

TSTNode* create_tst_node(char data) {
    TSTNode* temp = (TSTNode*) malloc(sizeof(TSTNode));
    temp->data = data;
    temp->is_end = 0;
    temp->left = temp->eq = temp->right = NULL;
    return temp;
}

int main() {
    printf("--- Ternary Search Tree (TST) 3-Way Branching Engine ---\n");
    TSTNode *root = create_tst_node('cat'[0]);
    printf("Created TST node '%c' reducing pointer array overhead from 26 to 3 pointers.\n", root->data);
    return 0;
}
