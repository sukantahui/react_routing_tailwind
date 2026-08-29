#include <stdio.h>
#include <stdlib.h>

typedef struct TNode {
    int data;
    struct TNode *left, *right;
} TNode;

typedef struct {
    TNode *node;
    int hd;
} QueueItem;

void vertical_order(TNode *root) {
    if (!root) return;
    QueueItem q[100]; int front = 0, rear = 0;
    q[rear++] = (QueueItem){root, 0};

    printf("Vertical Order Traversal Sample:\n");
    while (front < rear) {
        QueueItem curr = q[front++];
        printf("Node %d at Horizontal Distance (HD) = %d\n", curr.node->data, curr.hd);
        if (curr.node->left) q[rear++] = (QueueItem){curr.node->left, curr.hd - 1};
        if (curr.node->right) q[rear++] = (QueueItem){curr.node->right, curr.hd + 1};
    }
}

int main() {
    TNode *root = (TNode*)malloc(sizeof(TNode)); root->data = 1; root->left = NULL; root->right = NULL;
    root->left = (TNode*)malloc(sizeof(TNode)); root->left->data = 2; root->left->left = NULL; root->left->right = NULL;
    root->right = (TNode*)malloc(sizeof(TNode)); root->right->data = 3; root->right->left = NULL; root->right->right = NULL;

    printf("--- Vertical Order HD Indexing ---\n");
    vertical_order(root);
    return 0;
}
