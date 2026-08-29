#include <stdio.h>
#include <stdbool.h>

#define T 3 // Minimum degree (Max keys = 2T - 1 = 5)

typedef struct BTreeNode {
    int keys[2 * T - 1];
    struct BTreeNode *children[2 * T];
    int num_keys;
    bool is_leaf;
} BTreeNode;

int main() {
    printf("--- B-Tree Node Structure & Degree Order Properties ---\n");
    printf("Created B-Tree node of degree T=%d (Max Keys = %d, Max Children = %d)\n", T, 2 * T - 1, 2 * T);
    return 0;
}
