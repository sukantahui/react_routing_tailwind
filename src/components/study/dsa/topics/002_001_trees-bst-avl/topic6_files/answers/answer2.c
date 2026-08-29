#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

TNode* create_node(int val) {
    TNode *n = (TNode*)malloc(sizeof(TNode));
    n->data = val; n->left = NULL; n->right = NULL;
    return n;
}

void level_order(TNode *root) {
    if (!root) return;
    TNode *queue[100]; int front = 0, rear = 0;
    queue[rear++] = root;

    printf("Level-Order Traversal (BFS): ");
    while (front < rear) {
        TNode *curr = queue[front++];
        printf("%d ", curr->data);
        if (curr->left) queue[rear++] = curr->left;
        if (curr->right) queue[rear++] = curr->right;
    }
    printf("\n");
}

int main() {
    TNode *root = create_node(10);
    root->left = create_node(20); root->right = create_node(30);
    root->left->left = create_node(40); root->left->right = create_node(50);

    printf("--- Binary Tree BFS Level-Order Traversal ---\n");
    level_order(root);
    return 0;
}
