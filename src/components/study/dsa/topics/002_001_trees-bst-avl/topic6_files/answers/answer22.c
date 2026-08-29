#include <stdio.h>
#include <stdlib.h>

typedef struct AVLNode {
    int key, height;
    struct AVLNode *left, *right;
} AVLNode;

int height(AVLNode *n) { return n ? n->height : 0; }
int max(int a, int b) { return (a > b) ? a : b; }

AVLNode* create_avl_node(int key) {
    AVLNode *n = (AVLNode*)malloc(sizeof(AVLNode));
    n->key = key; n->height = 1; n->left = NULL; n->right = NULL;
    return n;
}

int get_balance(AVLNode *n) { return n ? height(n->left) - height(n->right) : 0; }

AVLNode* min_value_node(AVLNode *node) {
    AVLNode *current = node;
    while (current->left != NULL) current = current->left;
    return current;
}

AVLNode* delete_avl(AVLNode *root, int key) {
    if (!root) return root;
    if (key < root->key) root->left = delete_avl(root->left, key);
    else if (key > root->key) root->right = delete_avl(root->right, key);
    else {
        if (!root->left || !root->right) {
            AVLNode *temp = root->left ? root->left : root->right;
            if (!temp) { temp = root; root = NULL; }
            else *root = *temp;
            free(temp);
        } else {
            AVLNode *temp = min_value_node(root->right);
            root->key = temp->key;
            root->right = delete_avl(root->right, temp->key);
        }
    }
    if (!root) return root;
    root->height = 1 + max(height(root->left), height(root->right));
    return root;
}

int main() {
    AVLNode *root = create_avl_node(20);
    root->left = create_avl_node(10); root->right = create_avl_node(30);

    printf("--- AVL Tree Deletion & Re-balancing ---\n");
    root = delete_avl(root, 10);
    printf("Deleted 10 from AVL. Root Key = %d, Height = %d\n", root->key, root->height);
    return 0;
}
